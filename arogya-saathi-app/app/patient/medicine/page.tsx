// Patient medicine search page
'use client';

// Import the DashboardLayout component
import DashboardLayout from '@/components/DashboardLayout';

// Define the PatientMedicine component
export default function PatientMedicine() {
  return (
    <DashboardLayout role="patient">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Medicine Search</h1>
        
        {/* Search bar */}
        <div className="mb-6">
          <input 
            type="text" 
            placeholder="Search medicines..." 
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md"
          />
        </div>
        
        {/* Medicine list */}
        <div className="grid grid-cols-1 gap-4">
          {[
            { name: 'Paracetamol', price: '₹25', available: true },
            { name: 'Amoxicillin', price: '₹120', available: true },
            { name: 'Metformin', price: '₹85', available: false },
            { name: 'Aspirin', price: '₹30', available: true },
          ].map(medicine => (
            <div key={medicine.name} className="p-4 bg-gray-700 rounded-md flex justify-between items-center">
              <div>
                <h3 className="font-bold">{medicine.name}</h3>
                <p className="text-gray-300">{medicine.price}</p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs ${medicine.available ? 'bg-green-600' : 'bg-red-600'}`}>
                  {medicine.available ? 'Available' : 'Out of Stock'}
                </span>
                <button className="ml-3 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md">
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}