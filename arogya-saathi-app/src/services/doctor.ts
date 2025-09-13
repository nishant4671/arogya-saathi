// src/services/doctor.ts
import { apiService } from './api';

export interface DoctorDashboardData {
  upcomingAppointments: number;
  completedAppointments: number;
  patientQueue: number;
  recentPrescriptions: number;
}

export const doctorService = {
  getDashboardData: async (): Promise<DoctorDashboardData> => {
    try {
      // Attempt to fetch from the real API endpoint
      const data = await apiService.get<any>('/dashboard/doctor');
      return data;
    } catch (error) {
      console.warn('Doctor dashboard endpoint not available, using mock data for demo');
      // Fallback mock data
      return {
        upcomingAppointments: 5,
        completedAppointments: 12,
        patientQueue: 3,
        recentPrescriptions: 8
      };
    }
  },
};