import express from 'express';
import db, { Patient, User } from '../database';
import { authenticateToken, requireRole, AuthRequest } from '../middleware/auth';
import bcrypt from 'bcryptjs';
const router = express.Router();

// Get all patients (staff and doctor only)
router.get('/', authenticateToken, requireRole(['staff', 'doctor']), (req, res) => {
  try {
    const { page = 1, limit = 10, search, sortBy = 'name', sortOrder = 'asc' } = req.query;

    let query = `
      SELECT p.*, u.name, u.email, u.phone 
      FROM patients p 
      JOIN users u ON p.user_id = u.id 
      WHERE 1=1
    `;
    let params: any[] = [];

    if (search) {
      query += ` AND (u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (sortBy === 'name') {
      query += ` ORDER BY u.name ${sortOrder === 'desc' ? 'DESC' : 'ASC'}`;
    } else if (sortBy === 'createdAt') {
      query += ` ORDER BY p.created_at ${sortOrder === 'desc' ? 'DESC' : 'ASC'}`;
    }

    query += ` LIMIT ? OFFSET ?`;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    params.push(parseInt(limit as string), offset);

    const patients = db.prepare(query).all(...params) as (Patient & { name: string; email: string; phone: string })[];

    let totalQuery = `
      SELECT COUNT(*) as total 
      FROM patients p 
      JOIN users u ON p.user_id = u.id 
      WHERE 1=1
    `;
    let totalParams: any[] = [];
    if (search) {
      totalQuery += ` AND (u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)`;
      totalParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    const totalResult = db.prepare(totalQuery).get(...totalParams) as { total: number };
    const total = totalResult.total;

    res.json({
      patients,
      total,
      page: parseInt(page as string),
      totalPages: Math.ceil(total / parseInt(limit as string))
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single patient by ID
router.get('/:id', authenticateToken, (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const patient = db.prepare(`
      SELECT p.*, u.name, u.email, u.phone, u.address 
      FROM patients p 
      JOIN users u ON p.user_id = u.id 
      WHERE p.id = ?
    `).get(id) as (Patient & { name: string; email: string; phone: string; address: string });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // If the user is not staff or doctor, they can only access their own data
    if (req.user.role === 'patient' && req.user.id !== patient.user_id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create patient (registration)
router.post('/', async (req, res) => {
  try {
    const { name, email, password, phone, dateOfBirth, gender, address, emergencyContact } = req.body;

    // Input validation
    if (!name || !email || !password || !phone || !emergencyContact) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Start transaction
    // Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Start transaction
const insertUser = db.prepare(`
  INSERT INTO users (email, password, name, role, phone, address)
  VALUES (?, ?, ?, 'patient', ?, ?)
`);
const result = insertUser.run(email, hashedPassword, name, phone, address);
    const userId = result.lastInsertRowid;

    const insertPatient = db.prepare(`
      INSERT INTO patients (user_id, date_of_birth, gender, emergency_contact)
      VALUES (?, ?, ?, ?)
    `);
    insertPatient.run(userId, dateOfBirth, gender, emergencyContact);

    // Get the created patient with user details
    const patient = db.prepare(`
      SELECT p.*, u.name, u.email, u.phone, u.address 
      FROM patients p 
      JOIN users u ON p.user_id = u.id 
      WHERE p.user_id = ?
    `).get(userId) as (Patient & { name: string; email: string; phone: string; address: string });

    res.status(201).json(patient);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update patient profile
router.put('/:id', authenticateToken, (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { name, phone, address, emergencyContact } = req.body;

    // Check if patient exists
    const patient = db.prepare('SELECT * FROM patients WHERE id = ?').get(id) as Patient | undefined;
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // If the user is not staff or doctor, they can only update their own data
    if (req.user.role === 'patient' && req.user.id !== patient.user_id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update user table if name, phone, or address is provided
    if (name || phone || address) {
      const updateUser = db.prepare(`
        UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone), address = COALESCE(?, address) 
        WHERE id = ?
      `);
      updateUser.run(name, phone, address, patient.user_id);
    }

    // Update patient table if emergencyContact is provided
    if (emergencyContact) {
      const updatePatient = db.prepare('UPDATE patients SET emergency_contact = ? WHERE id = ?');
      updatePatient.run(emergencyContact, id);
    }

    // Get the updated patient
    const updatedPatient = db.prepare(`
      SELECT p.*, u.name, u.email, u.phone, u.address 
      FROM patients p 
      JOIN users u ON p.user_id = u.id 
      WHERE p.id = ?
    `).get(id) as (Patient & { name: string; email: string; phone: string; address: string });

    res.json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as patientRoutes };