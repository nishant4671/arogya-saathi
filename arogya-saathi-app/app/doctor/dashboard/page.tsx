'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import DashboardLayout from '@/app/components/DashboardLayout';
import DashboardCard from '@/app/components/DashboardCard';
import {
  CalendarIcon,
  CheckCircleIcon,
  UserGroupIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

// Mock data for the dashboard
const dashboardData = {
  upcomingAppointments: 5,
  completedAppointments: 12,
  patientQueue: 3,
  recentPrescriptions: 8
};

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(dashboardData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="doctor">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="doctor">
      <div className="space-y-6">
        {/* Welcome message with user name */}
        {user?.name && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800">
              Welcome back, Dr. {user.name}!
            </h2>
            <p className="text-blue-600">Here's your daily schedule</p>
          </div>
        )}

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Upcoming Appointments Card */}
          <DashboardCard
            title="Upcoming Appointments"
            value={data.upcomingAppointments}
            subtitle="Scheduled for today"
            icon={<CalendarIcon className="h-6 w-6" />}
          />

          {/* Completed Appointments Card */}
          <DashboardCard
            title="Completed Appointments"
            value={data.completedAppointments}
            subtitle="Today's completed visits"
            icon={<CheckCircleIcon className="h-6 w-6" />}
            variant="success"
          />

          {/* Patient Queue Card */}
          <DashboardCard
            title="Patients in Queue"
            value={data.patientQueue}
            subtitle="Waiting for consultation"
            icon={<UserGroupIcon className="h-6 w-6" />}
            variant="warning"
          />

          {/* Recent Prescriptions Card */}
          <DashboardCard
            title="Recent Prescriptions"
            value={data.recentPrescriptions}
            subtitle="Issued today"
            icon={<DocumentTextIcon className="h-6 w-6" />}
          />
        </div>

        {/* Additional dashboard content */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h2>
          <p className="text-gray-600">Your appointment schedule and patient details will appear here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}