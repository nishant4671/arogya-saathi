import express from 'express';
import bcrypt from 'bcryptjs';
import db, { User } from '../database';
import { generateToken, verifyToken } from '../utils/jwt';
import { validate } from '../middleware/validation';
import { loginSchema } from '../schemas/auth';

const router = express.Router();

// Login endpoint with validation
router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find user with proper typing
    const user = db.prepare(`
      SELECT * FROM users WHERE email = ? AND role = ?
    `).get(email, role) as User | undefined;

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password with bcrypt
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      },
      token,
      expiresIn: 86400 // 24 hours in seconds
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// Verify token endpoint
router.get('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ valid: false });
  }

  try {
    const user = verifyToken(token);
    res.json({ 
      valid: true, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
});

export { router as authRoutes };