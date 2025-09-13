// app/staff/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import DashboardLayout from '@/app/components/DashboardLayout';
import DashboardCard from '@/app/components/DashboardCard';
import SearchBar from '@/app/components/SearchBar';
import LanguageSwitch from '@/app/components/LanguageSwitch';
import { staffService } from '@/services/staff';
import {
  CalendarIcon,
  ExclamationTriangleIcon,
  QueueListIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

export default function StaffDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({
    todaysAppointments: {
      total: 0,
      completed: 0,
      pending: 0
    },
    pendingEmergencies: 0,
    lowStockMedicines: [] as Array<{ name: string; stock: number }>,
    patientsWaiting: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardData = await staffService.getDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error('Error fetching staff dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
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

  const appointmentProgress = data.todaysAppointments.total > 0 
    ? (data.todaysAppointments.completed / data.todaysAppointments.total) * 100 
    : 0;

  return (
    <DashboardLayout role="staff">
      <div className="space-y-6">
        {/* Header with search and language switch */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1 max-w-md">
            <SearchBar onSearch={(query) => console.log('Searching:', query)} />
          </div>
          <LanguageSwitch />
        </div>



        {/* Welcome message with user name */}
        {user?.name && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800">
              Welcome back, {user.name}!
            </h2>
            <p className="text-blue-600">Here's today's overview</p>
          </div>
        )}

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Today's Appointments Card */}
          <DashboardCard
            title="Today's Appointments"
            value={data.todaysAppointments.total}
            subtitle={`${data.todaysAppointments.completed} completed, ${data.todaysAppointments.pending} pending`}
            icon={<CalendarIcon className="h-6 w-6" />}
            progress={appointmentProgress}
          />

          {/* Pending Emergencies Card */}
          <DashboardCard
            title="Pending Emergencies"
            value={data.pendingEmergencies}
            subtitle="Requires immediate attention"
            icon={<ExclamationTriangleIcon className="h-6 w-6" />}
            variant="danger"
          />

          {/* Patients Waiting Card */}
          <DashboardCard
            title="Patients Waiting"
            value={data.patientsWaiting}
            subtitle="In waiting area"
            icon={<QueueListIcon className="h-6 w-6" />}
            variant="warning"
          />

          {/* Low Stock Medicines Card */}
          <DashboardCard
            title="Low Stock Medicines"
            value={data.lowStockMedicines.length}
            subtitle="Needs restocking"
            icon={<BeakerIcon className="h-6 w-6" />}
            variant="warning"
            items={data.lowStockMedicines.map(item => ({
              name: item.name,
              value: `${item.stock} left`
            }))}
          />
        </div>

        // Add this to your staff dashboard, near the other cards
<div className="bg-white rounded-lg shadow p-6">
  <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
  <div className="flex space-x-4">
    <a href="/staff/medicines" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Manage Medicines
    </a>
    {/* Add other action buttons as needed */}
  </div>
</div>

        {/* Additional dashboard content */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <p className="text-gray-600">Dashboard content will be expanded here with charts, tables, and more detailed information.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}