import db from '../database';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  try {
    // Clear existing data
    db.exec(`
      DELETE FROM patients;
      DELETE FROM users;
    `);

    // Hash passwords
    const hashedPassword = await bcrypt.hash('password', 10);

    // Insert demo users
    const insertUser = db.prepare(`
      INSERT INTO users (email, password, name, role, phone)
      VALUES (?, ?, ?, ?, ?)
    `);

    // Demo users with hashed passwords
    insertUser.run(
      'patient@arogyasaathi.com', 
      hashedPassword, 
      'Demo Patient', 
      'patient', 
      '+911234567890'
    );

    insertUser.run(
      'staff@arogyasaathi.com', 
      hashedPassword, 
      'Demo Staff', 
      'staff', 
      '+911234567891'
    );

    insertUser.run(
      'doctor@arogyasaathi.com', 
      hashedPassword, 
      'Demo Doctor', 
      'doctor', 
      '+911234567892'
    );

    console.log('Demo users created successfully with hashed passwords');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();