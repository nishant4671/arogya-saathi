
// staff inventory page
'use client';

// Import the MainHeader and Sidebar components
import MainHeader from '@/components/MainHeader';
import Sidebar from '@/components/Sidebar';

// Define the staffInventory component
export default function staffInventory() {
  return (
    // Page container with dark background
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Include the MainHeader component */}
      <MainHeader />
      
      {/* Include the Sidebar component */}
      <Sidebar role="staff" />
      
      {/* Main content */}
      <main className="ml-64 p-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Staff Inventory</h1>
          <p className="text-gray-300">This is the inventory page for staffs. Content will be added here soon.</p>
        </div>
      </main>
    </div>
  );
}
