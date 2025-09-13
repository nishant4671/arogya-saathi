import express from 'express';
import db from '../database';
import { authenticateToken, requireRole, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get appointments with filtering
router.get('/', authenticateToken, (req: AuthRequest, res) => {
  try {
    const { patientId, doctorId, date, status, page = 1, limit = 10 } = req.query;

    let query = `
      SELECT a.*, 
        p_user.name as patient_name, 
        d_user.name as doctor_name
      FROM appointments a
      JOIN users p_user ON a.patient_id = p_user.id
      JOIN users d_user ON a.doctor_id = d_user.id
      WHERE 1=1
    `;
    let params: any[] = [];

    // Role-based filtering
    if (req.user.role === 'patient') {
      query += ` AND a.patient_id = ?`;
      params.push(req.user.id);
    } else if (req.user.role === 'doctor') {
      query += ` AND a.doctor_id = ?`;
      params.push(req.user.id);
    }

    if (patientId) {
      query += ` AND a.patient_id = ?`;
      params.push(patientId);
    }

    if (doctorId) {
      query += ` AND a.doctor_id = ?`;
      params.push(doctorId);
    }

    if (date) {
      query += ` AND a.date = ?`;
      params.push(date);
    }

    if (status) {
      query += ` AND a.status = ?`;
      params.push(status);
    }

    query += ` ORDER BY a.date, a.time LIMIT ? OFFSET ?`;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    params.push(parseInt(limit as string), offset);

    const appointments = db.prepare(query).all(...params);

    // Count total for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM appointments a
      WHERE 1=1
    `;
    let countParams: any[] = [];

    if (req.user.role === 'patient') {
      countQuery += ` AND a.patient_id = ?`;
      countParams.push(req.user.id);
    } else if (req.user.role === 'doctor') {
      countQuery += ` AND a.doctor_id = ?`;
      countParams.push(req.user.id);
    }

    if (patientId) {
      countQuery += ` AND a.patient_id = ?`;
      countParams.push(patientId);
    }

    if (doctorId) {
      countQuery += ` AND a.doctor_id = ?`;
      countParams.push(doctorId);
    }

    if (date) {
      countQuery += ` AND a.date = ?`;
      countParams.push(date);
    }

    if (status) {
      countQuery += ` AND a.status = ?`;
      countParams.push(status);
    }

    const totalResult = db.prepare(countQuery).get(...countParams) as { total: number };
    const total = totalResult.total;

    res.json({
      appointments,
      total,
      page: parseInt(page as string),
      totalPages: Math.ceil(total / parseInt(limit as string))
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new appointment
router.post('/', authenticateToken, (req: AuthRequest, res) => {
  try {
    const { patientId, doctorId, date, time, reason, notes } = req.body;

    // Input validation
    if (!patientId || !doctorId || !date || !time || !reason) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the patient exists
    const patient = db.prepare('SELECT * FROM patients WHERE user_id = ?').get(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Check if the doctor exists and is a doctor
    const doctor = db.prepare('SELECT * FROM users WHERE id = ? AND role = ?').get(doctorId, 'doctor');
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Check for scheduling conflicts
    const existingAppointment = db.prepare(`
      SELECT * FROM appointments 
      WHERE doctor_id = ? AND date = ? AND time = ? AND status != 'cancelled'
    `).get(doctorId, date, time);

    if (existingAppointment) {
      return res.status(409).json({ error: 'Time slot already booked' });
    }

    // Insert the appointment
    const insertAppointment = db.prepare(`
      INSERT INTO appointments (patient_id, doctor_id, date, time, reason, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = insertAppointment.run(patientId, doctorId, date, time, reason, notes);
    const appointmentId = result.lastInsertRowid;

    // Fetch the created appointment with names
    const appointment = db.prepare(`
      SELECT a.*, 
        p_user.name as patient_name, 
        d_user.name as doctor_name
      FROM appointments a
      JOIN users p_user ON a.patient_id = p_user.id
      JOIN users d_user ON a.doctor_id = d_user.id
      WHERE a.id = ?
    `).get(appointmentId);

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update appointment status
router.patch('/:id', authenticateToken, (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { status, cancellationReason } = req.body;

    if (!status || !['confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Check if appointment exists
    const appointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id) as any;
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Authorization: patient can only cancel their own appointment
    // staff and doctor can update status
    if (req.user.role === 'patient' && appointment.patient_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    let updateQuery = `UPDATE appointments SET status = ?`;
    let params: any[] = [status];

    if (status === 'cancelled' && cancellationReason) {
      updateQuery += `, notes = COALESCE(notes, '') || ?`;
      params.push(` Cancellation reason: ${cancellationReason}`);
    }

    updateQuery += ` WHERE id = ?`;
    params.push(id);

    db.prepare(updateQuery).run(...params);

    // Fetch updated appointment
    const updatedAppointment = db.prepare(`
      SELECT a.*, 
        p_user.name as patient_name, 
        d_user.name as doctor_name
      FROM appointments a
      JOIN users p_user ON a.patient_id = p_user.id
      JOIN users d_user ON a.doctor_id = d_user.id
      WHERE a.id = ?
    `).get(id);

    res.json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get available time slots for a doctor on a specific date
router.get('/availability', authenticateToken, (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({ error: 'Missing doctorId or date' });
    }

    // Check if the doctor exists
    const doctor = db.prepare('SELECT * FROM users WHERE id = ? AND role = ?').get(doctorId, 'doctor');
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Define available time slots (for example, 9 AM to 5 PM in 30-minute intervals)
    const availableSlots = [];
    const startHour = 9;
    const endHour = 17;
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        availableSlots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }

    // Get booked slots for the doctor on the given date
    const bookedAppointments = db.prepare(`
      SELECT time FROM appointments 
      WHERE doctor_id = ? AND date = ? AND status != 'cancelled'
    `).all(doctorId, date) as { time: string }[];

    const bookedSlots = bookedAppointments.map(apt => apt.time);

    // Filter out booked slots
    const available = availableSlots.filter(slot => !bookedSlots.includes(slot));

    res.json({
      availableSlots: available,
      bookedSlots
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as appointmentRoutes };