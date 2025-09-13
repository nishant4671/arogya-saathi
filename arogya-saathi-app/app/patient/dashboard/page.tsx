// app/patient/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import DashboardLayout from '@/app/components/DashboardLayout';
import EnhancedQuickActions from '@/app/components/EnhancedQuickActions';
import MedicineList from '@/app/components/MedicineList';
import { patientService, Appointment } from '@/services/patient';
// Add this import at the top of the file
import { apiService } from '@/services/api';
export default function PatientDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({
    upcomingAppointments: 0,
    recentRecords: 0,
    medicineOrders: 0,
    healthTips: 0,
    patientName: '',
    patientId: 0
  });
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // In your app/patient/dashboard/page.tsx, update the useEffect:
useEffect(() => {
  const fetchDashboardData = async () => {
    if (user) {
      try {
        // Fetch medicines count (we'll use this later)
        const medicinesResponse = await apiService.get<{medicines: any[]}>('/medicines');
        const medicinesCount = medicinesResponse.medicines.length;
        
        // Fetch appointments
        const appointmentsResponse = await apiService.get<{appointments: any[]}>('/appointments');
        const patientAppointments = appointmentsResponse.appointments.filter(
          (apt: any) => apt.patientId === user.id
        );
        
        const upcomingAppointments = patientAppointments.filter((apt: any) => 
          new Date(apt.date) >= new Date() && apt.status === 'scheduled'
        ).length;

        setData({
          upcomingAppointments,
          recentRecords: 5, // Keep mock for now
          medicineOrders: medicinesCount > 4 ? 4 : medicinesCount, // Show up to 4
          healthTips: 7, // Keep mock for now
          patientName: user.name || 'Patient',
          patientId: user.id
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to mock data
        setData({
          upcomingAppointments: 3,
          recentRecords: 5,
          medicineOrders: 2,
          healthTips: 7,
          patientName: user.name || 'Patient',
          patientId: user.id
        });
      } finally {
        setLoading(false);
      }
    }
  };

  fetchDashboardData();
}, [user]);

  if (loading) {
    return (
      <DashboardLayout role="patient">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="patient">
      <div className="space-y-6">
        {user?.name && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800">
              Welcome back, {user.name}!
            </h2>
            <p className="text-blue-600">Patient ID: {user.id}</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Upcoming Appointments</h3>
            <p className="text-2xl font-bold text-blue-600">{data.upcomingAppointments}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Medical Records</h3>
            <p className="text-2xl font-bold text-green-600">{data.recentRecords}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Medicine Orders</h3>
            <p className="text-2xl font-bold text-purple-600">{data.medicineOrders}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Health Tips</h3>
            <p className="text-2xl font-bold text-orange-600">{data.healthTips}</p>
          </div>
        </div>

        {/* Real Data Components */}
        {user && <MedicineList patientId={user.id} />}

        <EnhancedQuickActions role="patient" />

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Patient ID</p>
              <p className="font-medium">{user?.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Role</p>
              <p className="font-medium capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}