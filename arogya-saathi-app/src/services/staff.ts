// src/services/staff.ts
import { apiService } from './api';

export interface Medicine {
  id: number;
  name: string;
  description: string;
  dosage: string;
  category: string;
  price: number;
  stock: number;
  low_stock_threshold: number;
}

export interface StaffDashboardData {
  todaysAppointments: {
    total: number;
    completed: number;
    pending: number;
  };
  pendingEmergencies: number;
  lowStockMedicines: Array<{ name: string; stock: number }>;
  patientsWaiting: number;
}

export const staffService = {
  getDashboardData: async (): Promise<StaffDashboardData> => {
    try {
      // Get real medicine data
      const response = await apiService.get<{medicines: Medicine[]}>('/api/medicines');
      const medicines = response.medicines;
      
      // Calculate low stock medicines from real data
      const lowStockMedicines = medicines
        .filter(medicine => medicine.stock < medicine.low_stock_threshold)
        .map(medicine => ({ name: medicine.name, stock: medicine.stock }));

      return {
        todaysAppointments: {
          total: 15,
          completed: 8,
          pending: 7
        },
        pendingEmergencies: 3,
        lowStockMedicines,
        patientsWaiting: 4
      };
    } catch (error) {
      console.warn('Using mock data for staff dashboard');
      return {
        todaysAppointments: {
          total: 15,
          completed: 8,
          pending: 7
        },
        pendingEmergencies: 3,
        lowStockMedicines: [
          { name: 'Paracetamol', stock: 12 },
          { name: 'Amoxicillin', stock: 8 }
        ],
        patientsWaiting: 4
      };
    }
  },

  getMedicines: async (): Promise<Medicine[]> => {
    try {
      const response = await apiService.get<{medicines: Medicine[]}>('/api/medicines');
      return response.medicines;
    } catch (error) {
      console.error('Error fetching medicines:', error);
      return [];
    }
  }
};