// src/services/patient.ts
import { apiService } from './api';

export interface PatientDashboardData {
  upcomingAppointments: number;
  recentRecords: number;
  medicineOrders: number;
  healthTips: number;
  patientName: string;
  patientId: number;
}

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  time: string;
  status: string;
  reason?: string;
}

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

export const patientService = {
  getDashboardData: async (patientId: number, patientName: string): Promise<PatientDashboardData> => {
    try {
      // Try to fetch real data where available
      const appointments = await apiService.get<{appointments: Appointment[]}>('/api/appointments');
      const patientAppointments = appointments.appointments.filter(apt => apt.patientId === patientId);
      
      const upcomingAppointments = patientAppointments.filter(apt => 
        new Date(apt.date) >= new Date() && apt.status === 'scheduled'
      ).length;

      return {
        upcomingAppointments,
        recentRecords: 5, // Mock for now
        medicineOrders: 2, // Mock for now
        healthTips: 7, // Mock for now
        patientName,
        patientId
      };
    } catch (error) {
      console.warn('Using enhanced mock data for patient dashboard');
      return {
        upcomingAppointments: 3,
        recentRecords: 5,
        medicineOrders: 2,
        healthTips: 7,
        patientName,
        patientId
      };
    }
  },

  getAppointments: async (patientId: number): Promise<Appointment[]> => {
    try {
      const response = await apiService.get<{appointments: Appointment[]}>('/api/appointments');
      return response.appointments.filter(apt => apt.patientId === patientId);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return [];
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