// app/components/MedicineList.tsx
'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';

interface Medicine {
  id: number;
  name: string;
  description: string;
  dosage: string;
  category: string;
  price: number;
  stock: number;
  low_stock_threshold: number;
}

interface MedicineListProps {
  patientId: number;
}

export default function MedicineList({ patientId }: MedicineListProps) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await apiService.get<{medicines: Medicine[]}>('/medicines');
        setMedicines(response.medicines);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [patientId]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Available Medicines</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {medicines.slice(0, 4).map(medicine => (
          <div key={medicine.id} className="border rounded-lg p-3">
            <h3 className="font-medium text-blue-600">{medicine.name}</h3>
            <p className="text-sm text-gray-600">{medicine.description}</p>
            <p className="text-sm">Dosage: {medicine.dosage}</p>
            <p className="text-sm">Stock: {medicine.stock}</p>
            <p className="text-sm font-medium">₹{medicine.price}</p>
          </div>
        ))}
      </div>
      {medicines.length > 4 && (
        <p className="text-sm text-gray-500 mt-4">
          +{medicines.length - 4} more medicines available
        </p>
      )}
    </div>
  );
}