// Patient medical records page
'use client';

// Import the DashboardLayout component
import DashboardLayout from '@/components/DashboardLayout';

// Define the PatientRecords component
export default function PatientRecords() {
  return (
    <DashboardLayout role="patient">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Medical Records</h1>
        
        {/* Records list */}
        <div className="grid grid-cols-1 gap-4">
          {[
            { date: '2023-10-15', doctor: 'Dr. Sharma', diagnosis: 'Hypertension', prescription: 'Medication prescribed' },
            { date: '2023-08-22', doctor: 'Dr. Patel', diagnosis: 'Regular checkup', prescription: 'No medication needed' },
            { date: '2023-05-10', doctor: 'Dr. Kumar', diagnosis: 'Fever', prescription: 'Antibiotics prescribed' },
          ].map(record => (
            <div key={record.date} className="p-4 bg-gray-700 rounded-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{record.date}</h3>
                <span className="px-2 py-1 bg-blue-600 rounded-md text-xs">{record.doctor}</span>
              </div>
              <p className="mb-2"><strong>Diagnosis:</strong> {record.diagnosis}</p>
              <p><strong>Prescription:</strong> {record.prescription}</p>
            </div>
          ))}
        </div>
        
        {/* Download button */}
        <button className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-bold">
          Download All Records
        </button>
      </div>
    </DashboardLayout>
  );
}