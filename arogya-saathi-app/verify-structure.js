const fs = require('fs');
const path = require('path');

console.log('Verifying project structure...');

// Check if components folder exists
const componentsPath = path.join(__dirname, 'app', 'components');
if (!fs.existsSync(componentsPath)) {
  console.log('Creating components folder...');
  fs.mkdirSync(componentsPath, { recursive: true });
}

// Check if Header component exists
const headerPath = path.join(componentsPath, 'Header.tsx');
if (!fs.existsSync(headerPath)) {
  console.log('Creating Header component...');
  fs.writeFileSync(headerPath, `// Header.tsx - Reusable navigation header component
'use client';

// Import Link for navigation
import Link from 'next/link';
// Import the useAuth hook
import { useAuth } from '@/context/AuthContext';
// Import useRouter for navigation
import { useRouter } from 'next/navigation';

// Define the Header component
export default function Header() {
  // Get user and logout function from authentication context
  const { user, logout } = useAuth();
  // Initialize router for navigation
  const router = useRouter();

  // Handle logout functionality
  const handleLogout = () => {
    logout(); // Clear user state
    router.push('/'); // Redirect to home page
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Application title */}
      <Link href="/" className="text-xl font-bold text-white">
        Arogya Saathi
      </Link>
      <nav className="flex items-center space-x-4">
        {/* Show user role if logged in */}
        {user.role && (
          <span className="text-gray-300">Logged in as: {user.role}</span>
        )}
        {/* Home link */}
        <Link href="/" className="text-gray-400 hover:text-white">
          Home
        </Link>
        {/* Show dashboard link if logged in */}
        {user.role && (
          <Link href={\`/\${user.role}/dashboard\`} className="text-gray-400 hover:text-white">
            Dashboard
          </Link>
        )}
        {/* Logout button if logged in */}
        {user.role && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
`);
}

console.log('Structure verification complete!');