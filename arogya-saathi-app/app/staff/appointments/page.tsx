// Staff appointments management page
'use client';

// Import the DashboardLayout component
import DashboardLayout from '@/components/DashboardLayout';

// Define the StaffAppointments component
export default function StaffAppointments() {
  return (
    <DashboardLayout role="staff">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Manage Appointments</h1>
        
        {/* Appointments list */}
        <div className="grid grid-cols-1 gap-4">
          {[
            { id: 'A001', patient: 'Ravi Kumar', doctor: 'Dr. Sharma', time: '09:00 AM', status: 'Confirmed' },
            { id: 'A002', patient: 'Sunita Patel', doctor: 'Dr. Kumar', time: '10:30 AM', status: 'Pending' },
            { id: 'A003', patient: 'Amit Sharma', doctor: 'Dr. Patel', time: '12:00 PM', status: 'Confirmed' },
            { id: 'A004', patient: 'Priya Singh', doctor: 'Dr. Sharma', time: '02:30 PM', status: 'Cancelled' },
          ].map(appointment => (
            <div key={appointment.id} className="p-4 bg-gray-700 rounded-md flex justify-between items-center">
              <div>
                <h3 className="font-bold">{appointment.patient}</h3>
                <p className="text-gray-300">{appointment.doctor} • {appointment.time}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  appointment.status === 'Confirmed' ? 'bg-green-600' : 
                  appointment.status === 'Pending' ? 'bg-yellow-600' : 'bg-red-600'
                }`}>
                  {appointment.status}
                </span>
                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add new appointment button */}
        <button className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-bold">
          Add New Appointment
        </button>
      </div>
    </DashboardLayout>
  );
}