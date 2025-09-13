const fs = require('fs');
const path = require('path');

// Define all pages that need fixing
const pagesToFix = [
  'app/patient/dashboard/page.tsx',
  'app/patient/appointment/page.tsx',
  'app/patient/medicine/page.tsx',
  'app/patient/records/page.tsx',
  'app/patient/tips/page.tsx',
  'app/staff/dashboard/page.tsx',
  'app/staff/appointments/page.tsx',
  'app/staff/records/page.tsx',
  'app/staff/inventory/page.tsx',
  'app/staff/reports/page.tsx',
  'app/doctor/dashboard/page.tsx',
  'app/doctor/appointments/page.tsx',
  'app/doctor/records/page.tsx',
  'app/doctor/prescriptions/page.tsx',
  'app/doctor/availability/page.tsx'
];

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace relative imports with absolute imports
  content = content.replace(
    /import MainHeader from \'\.\.\/\.\.\/\.\.\/components\/MainHeader\';/g,
    'import MainHeader from \'@/components/MainHeader\';'
  );
  
  content = content.replace(
    /import Sidebar from \'\.\.\/\.\.\/\.\.\/components\/Sidebar\';/g,
    'import Sidebar from \'@/components/Sidebar\';'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed imports in: ${filePath}`);
}

// Fix all files
pagesToFix.forEach(filePath => {
  fixImportsInFile(filePath);
});

console.log('All imports fixed!');