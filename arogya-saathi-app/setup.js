const fs = require('fs');
const path = require('path');

// Define the folder structure to create
const folders = [
  'app/patient/login',
  'app/patient/dashboard',
  'app/staff/login',
  'app/staff/dashboard',
  'app/doctor/login',
  'app/doctor/dashboard',
  'app/components',
  'app/context'
];

// Create all folders
folders.forEach(folder => {
  const dir = path.join(__dirname, folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created folder: ${folder}`);
  }
});

console.log('Folder structure created successfully!');
