// C:\Users\HP\Desktop\arogya sathi\arogya-saathi-app\app\page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  UserIcon, 
  UserGroupIcon, 
  BriefcaseIcon 
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-blue-600 rounded-lg p-2 mr-3">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Arogya Saathi</h1>
            </div>
            <div className="hidden md:block">
              <p className="text-sm text-gray-500">Comprehensive Digital Health Ecosystem</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Healthcare Access for 
            <span className="text-blue-600"> Rural Punjab</span>
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Bridging the healthcare gap in rural communities with technology
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
          {/* Patient Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-6">
              <div className="bg-blue-100 rounded-lg p-3 inline-flex">
                <UserIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Patient</h3>
              <p className="mt-2 text-gray-500">
                Book appointments, access medical records, order medicines, and get health tips.
              </p>
              <div className="mt-6">
                <Link
                  href="/patient/login"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Patient Login
                </Link>
              </div>
            </div>
          </div>

          {/* Staff Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-6">
              <div className="bg-green-100 rounded-lg p-3 inline-flex">
                <UserGroupIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Staff</h3>
              <p className="mt-2 text-gray-500">
                Manage appointments, handle inventory, generate reports, and support patients.
              </p>
              <div className="mt-6">
                <Link
                  href="/staff/login"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Staff Login
                </Link>
              </div>
            </div>
          </div>

          {/* Doctor Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-6">
              <div className="bg-purple-100 rounded-lg p-3 inline-flex">
                <BriefcaseIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Doctor</h3>
              <p className="mt-2 text-gray-500">
                Manage appointments, write prescriptions, set availability, and view patient records.
              </p>
              <div className="mt-6">
                <Link
                  href="/doctor/login"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                >
                  Doctor Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 inline-flex mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Appointment Booking</h3>
              <p className="mt-2 text-gray-500">Easy online appointment scheduling with healthcare providers</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 inline-flex mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m2-10h-2m2-2h-2m-2 2H9m2-2H9m2 2H9m2 2H9m2 2H9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Medical Records</h3>
              <p className="mt-2 text-gray-500">Secure access to your complete medical history</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 inline-flex mb-4">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Medicine Orders</h3>
              <p className="mt-2 text-gray-500">Convenient medicine ordering with home delivery options</p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 rounded-full p-3 inline-flex mb-4">
                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Emergency Support</h3>
              <p className="mt-2 text-gray-500">Immediate assistance and emergency contact features</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Arogya Saathi. All rights reserved.</p>
          <p className="mt-2">Designed for rural healthcare access in Punjab, India</p>
        </footer>
      </main>
    </div>
  );
}