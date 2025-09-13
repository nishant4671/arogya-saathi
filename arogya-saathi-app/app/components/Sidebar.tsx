// Sidebar.tsx - Reusable sidebar navigation component
'use client';

// Import Link for navigation
import Link from 'next/link';
// Import useRouter for navigation
import { useRouter } from 'next/navigation';
// Import the useAuth hook
import { useAuth } from '../context/AuthContext';

// Define the Sidebar component props
interface SidebarProps {
  role: string;
}

// Define the Sidebar component
export default function Sidebar({ role }: SidebarProps) {
  // Initialize router for navigation
  const router = useRouter();
  // Get user from authentication context
  const { user } = useAuth();

  // Navigation items based on role
  const navItems = {
    patient: [
      { name: 'Dashboard', href: '/patient/dashboard', icon: '📊' },
      { name: 'Book Appointment', href: '/patient/appointment', icon: '📅' },
      { name: 'Medical Records', href: '/patient/records', icon: '📋' },
      { name: 'Medicine Orders', href: '/patient/medicine', icon: '💊' },
      { name: 'Health Tips', href: '/patient/tips', icon: '💡' },
    ],
    staff: [
      { name: 'Dashboard', href: '/staff/dashboard', icon: '📊' },
      { name: 'Manage Appointments', href: '/staff/appointments', icon: '📅' },
      { name: 'Patient Records', href: '/staff/records', icon: '📋' },
      { name: 'Inventory', href: '/staff/inventory', icon: '📦' },
      { name: 'Reports', href: '/staff/reports', icon: '📈' },
    ],
    doctor: [
      { name: 'Dashboard', href: '/doctor/dashboard', icon: '📊' },
      { name: 'My Appointments', href: '/doctor/appointments', icon: '📅' },
      { name: 'Patient Records', href: '/doctor/records', icon: '📋' },
      { name: 'Prescriptions', href: '/doctor/prescriptions', icon: '💊' },
      { name: 'Availability', href: '/doctor/availability', icon: '⏰' },
    ],
  };

  return (
    <div className="w-64 bg-gray-800 h-screen p-4 fixed left-0 top-0">
      {/* User info */}
      {user && (
  <div className="mb-8 p-4 bg-gray-700 rounded-lg">
    <h2 className="text-white font-bold">{user.name}</h2>
    <p className="text-gray-300 text-sm capitalize">{user.role}</p>
  </div>
)}
      
      {/* Navigation items */}
      <nav className="space-y-2">
        {navItems[role as keyof typeof navItems].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center space-x-2 p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      
      {/* Quick actions */}
      <div className="mt-8 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-white font-bold mb-2">Quick Actions</h3>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mb-2">
          Emergency Alert
        </button>
        <button className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded">
          Quick Help
        </button>
      </div>
    </div>
  );
}