import express from 'express';
import db from '../database';
import { authenticateToken, requireRole, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all medicines
router.get('/', authenticateToken, (req, res) => {
  try {
    const { search, category, lowStock, page = 1, limit = 10 } = req.query;

    let query = `SELECT * FROM medicines WHERE 1=1`;
    let params: any[] = [];

    if (search) {
      query += ` AND (name LIKE ? OR description LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    if (category) {
      query += ` AND category = ?`;
      params.push(category);
    }

    if (lowStock === 'true') {
      query += ` AND stock <= low_stock_threshold`;
    }

    // Get categories for filtering
    const categories = db.prepare('SELECT DISTINCT category FROM medicines WHERE category IS NOT NULL')
      .all()
      .map((row: any) => row.category);

    query += ` LIMIT ? OFFSET ?`;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    params.push(parseInt(limit as string), offset);

    const medicines = db.prepare(query).all(...params);

    // Count total
    let countQuery = `SELECT COUNT(*) as total FROM medicines WHERE 1=1`;
    let countParams: any[] = [];

    if (search) {
      countQuery += ` AND (name LIKE ? OR description LIKE ?)`;
      countParams.push(`%${search}%`, `%${search}%`);
    }

    if (category) {
      countQuery += ` AND category = ?`;
      countParams.push(category);
    }

    if (lowStock === 'true') {
      countQuery += ` AND stock <= low_stock_threshold`;
    }

    const totalResult = db.prepare(countQuery).get(...countParams) as { total: number };
    const total = totalResult.total;

    res.json({
      medicines,
      total,
      page: parseInt(page as string),
      totalPages: Math.ceil(total / parseInt(limit as string)),
      categories
    });
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create medicine order
router.post('/order', authenticateToken, (req: AuthRequest, res) => {
  try {
    const { patientId, items, deliveryAddress } = req.body;

    if (!patientId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if patient exists
    const patient = db.prepare('SELECT * FROM patients WHERE user_id = ?').get(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Start transaction
    const orderInsert = db.prepare(`
      INSERT INTO orders (patient_id, delivery_address, status)
      VALUES (?, ?, 'pending')
    `);
    const orderResult = orderInsert.run(patientId, deliveryAddress);
    const orderId = orderResult.lastInsertRowid;

    // Insert order items and update stock
    const orderItemInsert = db.prepare(`
      INSERT INTO order_items (order_id, medicine_id, quantity, dosage_instructions)
      VALUES (?, ?, ?, ?)
    `);

    const updateStock = db.prepare(`
      UPDATE medicines SET stock = stock - ? WHERE id = ? AND stock >= ?
    `);

    for (const item of items) {
      // Check if medicine exists and has enough stock
      const medicine = db.prepare('SELECT * FROM medicines WHERE id = ?').get(item.medicineId) as any;
if (!medicine) {
  return res.status(404).json({ error: `Medicine with ID ${item.medicineId} not found` });
}

if (medicine.stock < item.quantity) {
  return res.status(400).json({ 
    error: `Not enough stock for ${medicine.name}. Available: ${medicine.stock}, Requested: ${item.quantity}` 
  });
}

      // Insert order item
      orderItemInsert.run(orderId, item.medicineId, item.quantity, item.dosageInstructions);

      // Update stock
      updateStock.run(item.quantity, item.medicineId, item.quantity);
    }

    // Get the created order with details
    const order = db.prepare(`
      SELECT o.*, 
        p.user_id as patient_user_id,
        u.name as patient_name
      FROM orders o
      JOIN patients p ON o.patient_id = p.id
      JOIN users u ON p.user_id = u.id
      WHERE o.id = ?
    `).get(orderId);

    const orderItems = db.prepare(`
      SELECT oi.*, m.name as medicine_name, m.price
      FROM order_items oi
      JOIN medicines m ON oi.medicine_id = m.id
      WHERE oi.order_id = ?
    `).all(orderId);

    res.status(201).json({
      order,
      items: orderItems
    });
  } catch (error) {
    console.error('Error creating medicine order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get inventory
router.get('/inventory', authenticateToken, requireRole(['staff', 'doctor']), (req, res) => {
  try {
    const { lowStock, category } = req.query;

    let query = `SELECT * FROM medicines WHERE 1=1`;
    let params: any[] = [];

    if (lowStock === 'true') {
      query += ` AND stock <= low_stock_threshold`;
    }

    if (category) {
      query += ` AND category = ?`;
      params.push(category);
    }

    const inventory = db.prepare(query).all(...params);

    res.json({ inventory });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update inventory
router.patch('/inventory/:id', authenticateToken, requireRole(['staff']), (req, res) => {
  try {
    const { id } = req.params;
    const { stock, lowStockThreshold } = req.body;

    // Check if medicine exists
    const medicine = db.prepare('SELECT * FROM medicines WHERE id = ?').get(id);
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    let updateQuery = `UPDATE medicines SET `;
    let params: any[] = [];
    let updates: string[] = [];

    if (stock !== undefined) {
      updates.push('stock = ?');
      params.push(stock);
    }

    if (lowStockThreshold !== undefined) {
      updates.push('low_stock_threshold = ?');
      params.push(lowStockThreshold);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updateQuery += updates.join(', ') + ' WHERE id = ?';
    params.push(id);

    db.prepare(updateQuery).run(...params);

    // Get updated medicine
    const updatedMedicine = db.prepare('SELECT * FROM medicines WHERE id = ?').get(id);

    res.json(updatedMedicine);
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as medicineRoutes };