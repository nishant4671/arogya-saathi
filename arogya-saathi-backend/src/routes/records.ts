import express from 'express';
import db from '../database';
import { authenticateToken, requireRole, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get patient medical records
router.get('/:patientId', authenticateToken, (req: AuthRequest, res) => {
  try {
    const { patientId } = req.params;
    const { page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc' } = req.query;

    // Check if patient exists
    const patient = db.prepare('SELECT * FROM patients WHERE user_id = ?').get(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Authorization: patient can only access their own records
    // staff and doctor can access any records
    if (req.user.role === 'patient' && req.user.id !== parseInt(patientId)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    let query = `
      SELECT mr.*, 
        d_user.name as doctor_name,
        p_user.name as patient_name
      FROM medical_records mr
      JOIN users d_user ON mr.doctor_id = d_user.id
      JOIN users p_user ON mr.patient_id = p_user.id
      WHERE mr.patient_id = ?
    `;
    let params: any[] = [patientId];

    if (sortBy === 'date') {
      query += ` ORDER BY mr.created_at ${sortOrder === 'asc' ? 'ASC' : 'DESC'}`;
    }

    query += ` LIMIT ? OFFSET ?`;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    params.push(parseInt(limit as string), offset);

    const records = db.prepare(query).all(...params);

    // Count total
    const totalResult = db.prepare(`
      SELECT COUNT(*) as total 
      FROM medical_records 
      WHERE patient_id = ?
    `).get(patientId) as { total: number };
    const total = totalResult.total;

    res.json({
      records,
      total,
      page: parseInt(page as string),
      totalPages: Math.ceil(total / parseInt(limit as string))
    });
  } catch (error) {
    console.error('Error fetching medical records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create medical record
router.post('/', authenticateToken, requireRole(['doctor']), (req: AuthRequest, res) => {
  try {
    const { patientId, diagnosis, prescription, notes, attachments, vitalSigns } = req.body;

    if (!patientId || !diagnosis) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if patient exists
    const patient = db.prepare('SELECT * FROM patients WHERE user_id = ?').get(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Insert medical record
    const insertRecord = db.prepare(`
      INSERT INTO medical_records 
        (patient_id, doctor_id, diagnosis, prescription, notes, attachments, vital_signs)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertRecord.run(
      patientId,
      req.user.id,
      diagnosis,
      prescription,
      notes,
      attachments ? JSON.stringify(attachments) : null,
      vitalSigns ? JSON.stringify(vitalSigns) : null
    );

    const recordId = result.lastInsertRowid;

    // Get the created record with doctor and patient names
    const record = db.prepare(`
      SELECT mr.*, 
        d_user.name as doctor_name,
        p_user.name as patient_name
      FROM medical_records mr
      JOIN users d_user ON mr.doctor_id = d_user.id
      JOIN users p_user ON mr.patient_id = p_user.id
      WHERE mr.id = ?
    `).get(recordId);

    res.status(201).json(record);
  } catch (error) {
    console.error('Error creating medical record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as recordRoutes };