import { z } from 'zod';

export const patientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  address: z.string().optional(),
  emergencyContact: z.string().min(10, 'Emergency contact must be at least 10 digits')
});

export const appointmentSchema = z.object({
  patientId: z.number().positive('Patient ID must be positive'),
  doctorId: z.number().positive('Doctor ID must be positive'),
  date: z.string().date('Invalid date format'),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
  notes: z.string().optional()
});

export const medicineSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  dosage: z.string().min(3, 'Dosage must be at least 3 characters'),
  category: z.string().min(2, 'Category must be at least 2 characters'),
  price: z.number().positive('Price must be positive'),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  lowStockThreshold: z.number().int().nonnegative('Threshold cannot be negative')
});

// Add more schemas as needed