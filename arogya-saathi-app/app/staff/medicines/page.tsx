// app/staff/medicines/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { staffService, Medicine } from '@/services/staff';
import DashboardLayout from '@/app/components/DashboardLayout';

export default function MedicineManagement() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const medicineData = await staffService.getMedicines();
        setMedicines(medicineData);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="staff">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="staff">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Medicine Inventory</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicines.map(medicine => (
            <div key={medicine.id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-lg">{medicine.name}</h3>
              <p className="text-gray-600">{medicine.description}</p>
              <div className="mt-2">
                <p className={`text-sm ${
                  medicine.stock < medicine.low_stock_threshold 
                    ? 'text-red-600 font-bold' 
                    : 'text-gray-600'
                }`}>
                  Stock: {medicine.stock} (Threshold: {medicine.low_stock_threshold})
                </p>
                <p className="text-sm text-gray-600">Dosage: {medicine.dosage}</p>
                <p className="text-sm text-gray-600">Category: {medicine.category}</p>
                <p className="text-sm font-medium">Price: ₹{medicine.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}