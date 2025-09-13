import db from '../database';

const seedData = () => {
  // Insert sample medicines
  const medicines = [
    ['Paracetamol', 'Pain reliever and fever reducer', '500mg', 'Pain Relief', 5.99, 100, 20],
    ['Amoxicillin', 'Antibiotic for bacterial infections', '250mg', 'Antibiotic', 12.50, 50, 10],
    ['Ibuprofen', 'NSAID for pain and inflammation', '200mg', 'Pain Relief', 7.25, 75, 15],
    ['Omeprazole', 'Reduces stomach acid', '20mg', 'Gastrointestinal', 15.75, 30, 5],
    ['Atorvastatin', 'Lowers cholesterol', '10mg', 'Cardiovascular', 18.99, 40, 8]
  ];

  const insertMedicine = db.prepare(`
    INSERT INTO medicines (name, description, dosage, category, price, stock, low_stock_threshold)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const medicine of medicines) {
    insertMedicine.run(...medicine);
  }

  console.log('Sample data added successfully');
};

seedData();