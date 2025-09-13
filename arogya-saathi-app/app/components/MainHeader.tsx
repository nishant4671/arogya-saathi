'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';

const MainHeader: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and brand name */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="font-bold text-white">AS</span>
            </div>
            <span className="text-xl font-bold">Arogya Saathi</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {/* Show user info if logged in */}
            {user && user.role && (
              <span className="text-gray-300">
                {user.name} ({user.role})
              </span>
            )}

            {/* Navigation links based on authentication status */}
            {user ? (
              <>
                <Link href={`/${user.role}/dashboard`} className="hover:text-blue-300">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/patient/login" className="hover:text-blue-300">
                  Patient Login
                </Link>
                <Link href="/staff/login" className="hover:text-blue-300">
                  Staff Login
                </Link>
                <Link href="/doctor/login" className="hover:text-blue-300">
                  Doctor Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;