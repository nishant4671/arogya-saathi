import Database, { Database as DatabaseType } from 'better-sqlite3';

// Define interfaces for our data models
export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'patient' | 'staff' | 'doctor';
  phone?: string;
  address?: string;
  created_at: string;
}

export interface Patient {
  id: number;
  user_id: number;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  blood_type?: string;
  emergency_contact: string;
  medical_history?: string;
}

const db: DatabaseType = new Database('./dev.db');

// Create tables if they don't exist
// Add these to the existing db.exec() call
db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'scheduled' CHECK(status IN ('scheduled', 'confirmed', 'cancelled', 'completed')),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users (id),
    FOREIGN KEY (doctor_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS medicines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    dosage TEXT,
    category TEXT,
    price REAL,
    stock INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    delivery_address TEXT,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients (id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    medicine_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    dosage_instructions TEXT,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (medicine_id) REFERENCES medicines (id)
  );

  CREATE TABLE IF NOT EXISTS medical_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    diagnosis TEXT NOT NULL,
    prescription TEXT,
    notes TEXT,
    attachments TEXT,
    vital_signs TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users (id),
    FOREIGN KEY (doctor_id) REFERENCES users (id)
  );
`);
export default db;