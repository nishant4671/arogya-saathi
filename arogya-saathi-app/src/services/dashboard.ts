import { apiService } from './api';

export const dashboardService = {
  getStaffDashboard: async () => {
    return apiService.get('/dashboard/staff');
  },
  getPatientDashboard: async () => {
    return apiService.get('/dashboard/patient');
  },
  getDoctorDashboard: async () => {
    return apiService.get('/dashboard/doctor');
  }
};