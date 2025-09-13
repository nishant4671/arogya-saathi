// Patient appointment booking page
'use client';

// Import the DashboardLayout component
import DashboardLayout from '@/components/DashboardLayout';

// Define the PatientAppointment component
export default function PatientAppointment() {
  return (
    <DashboardLayout role="patient">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Book Appointment</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doctor selection */}
          <div>
            <h2 className="text-xl font-bold mb-4">Select Doctor</h2>
            <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md">
              <option>Dr. Sharma - Cardiologist</option>
              <option>Dr. Patel - Neurologist</option>
              <option>Dr. Kumar - Orthopedic</option>
            </select>
          </div>
          
          {/* Date selection */}
          <div>
            <h2 className="text-xl font-bold mb-4">Select Date</h2>
            <input type="date" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md" />
          </div>
        </div>
        
        {/* Time slots */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Available Time Slots</h2>
          <div className="grid grid-cols-4 gap-3">
            {['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'].map(time => (
              <button key={time} className="p-3 bg-blue-600 hover:bg-blue-700 rounded-md text-center">
                {time}
              </button>
            ))}
          </div>
        </div>
        
        {/* Book button */}
        <button className="mt-6 w-full bg-green-600 hover:bg-green-700 p-3 rounded-md font-bold">
          Book Appointment
        </button>
      </div>
    </DashboardLayout>
  );
}