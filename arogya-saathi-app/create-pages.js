const fs = require('fs');
const path = require('path');

// Define pages to create for each role
const pages = {
  patient: ['appointment', 'records', 'medicine', 'tips'],
  staff: ['appointments', 'records', 'inventory', 'reports'],
  doctor: ['appointments', 'records', 'prescriptions', 'availability']
};

// Base template for pages
const pageTemplate = (role, pageName) => `
// ${role} ${pageName} page
'use client';

// Import the MainHeader and Sidebar components
import MainHeader from '../../../components/MainHeader';
import Sidebar from '../../../components/Sidebar';

// Define the ${role}${pageName.charAt(0).toUpperCase() + pageName.slice(1)} component
export default function ${role}${pageName.charAt(0).toUpperCase() + pageName.slice(1)}() {
  return (
    // Page container with dark background
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Include the MainHeader component */}
      <MainHeader />
      
      {/* Include the Sidebar component */}
      <Sidebar role="${role}" />
      
      {/* Main content */}
      <main className="ml-64 p-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-6">${role.charAt(0).toUpperCase() + role.slice(1)} ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}</h1>
          <p className="text-gray-300">This is the ${pageName} page for ${role}s. Content will be added here soon.</p>
        </div>
      </main>
    </div>
  );
}
`;

// Create all pages
Object.keys(pages).forEach(role => {
  pages[role].forEach(page => {
    const dir = path.join(__dirname, 'app', role, page);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const filePath = path.join(dir, 'page.tsx');
    fs.writeFileSync(filePath, pageTemplate(role, page));
    console.log(`Created: ${filePath}`);
  });
});

console.log('All pages created successfully!');