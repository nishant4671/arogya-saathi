// DashboardLayout.tsx - Unified layout for all dashboards
'use client';

// Import the EnhancedHeader and Sidebar components
import EnhancedHeader from './EnhancedHeader';
import Sidebar from './Sidebar';

// Define the DashboardLayout component props
interface DashboardLayoutProps {
  children: React.ReactNode;
  role: string;
}

// Define the DashboardLayout component
export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    // Page container with dark background
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Include the EnhancedHeader component */}
      <EnhancedHeader />
      
      {/* Include the Sidebar component */}
      <Sidebar role={role} />
      
      {/* Main content */}
      <main className="ml-64 p-8 pt-20">
        {children}
      </main>
    </div>
  );
}