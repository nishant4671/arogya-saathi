'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { 
  SunIcon, 
  MoonIcon, 
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  PhoneIcon,
  WifiIcon,
  SignalSlashIcon, // Correct icon for offline status
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const EnhancedHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'x-large'>('normal');
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('Punjab, India');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleHighContrast = () => setHighContrast(!highContrast);
  const toggleScreenReader = () => setScreenReaderEnabled(!screenReaderEnabled);

  const changeTextSize = (size: 'normal' | 'large' | 'x-large') => {
    setTextSize(size);
  };

  const increaseTextSize = () => {
    if (textSize === 'normal') changeTextSize('large');
    else if (textSize === 'large') changeTextSize('x-large');
  };

  const decreaseTextSize = () => {
    if (textSize === 'x-large') changeTextSize('large');
    else if (textSize === 'large') changeTextSize('normal');
  };

  const handleEmergency = () => {
    alert('Emergency help is on the way! Please stay on the line.');
    // In a real app, this would trigger an emergency protocol
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Arogya Saathi</h1>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <span className="text-gray-700">
                {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) + ' Dashboard' : 'Dashboard'}
              </span>
            </div>
          </div>

          {/* Center section - Time and Location */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ClockIcon className="h-4 w-4" />
              <span>{currentTime.toLocaleTimeString()}</span>
              <MapPinIcon className="h-4 w-4 ml-2" />
              <span>{location}</span>
              <div className="flex items-center ml-2">
                {isOnline ? (
                  <WifiIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <SignalSlashIcon className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
          </div>

          {/* Right section - User info and accessibility controls */}
          <div className="flex items-center space-x-3">
            {/* Accessibility controls */}
            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={toggleDarkMode}
                className="p-1 rounded-md text-gray-400 hover:text-gray-500"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
              
              <button
                onClick={toggleHighContrast}
                className="p-1 rounded-md text-gray-400 hover:text-gray-500"
                title={highContrast ? 'Disable high contrast' : 'Enable high contrast'}
              >
                {highContrast ? (
                  <ArrowsPointingInIcon className="h-5 w-5" />
                ) : (
                  <ArrowsPointingOutIcon className="h-5 w-5" />
                )}
              </button>
              
              <button
                onClick={toggleScreenReader}
                className="p-1 rounded-md text-gray-400 hover:text-gray-500"
                title={screenReaderEnabled ? 'Disable screen reader' : 'Enable screen reader'}
              >
                {screenReaderEnabled ? (
                  <SpeakerXMarkIcon className="h-5 w-5" />
                ) : (
                  <SpeakerWaveIcon className="h-5 w-5" />
                )}
              </button>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={decreaseTextSize}
                  disabled={textSize === 'normal'}
                  className="p-1 rounded-md text-gray-400 hover:text-gray-500 disabled:opacity-50"
                  title="Decrease text size"
                >
                  A-
                </button>
                <button
                  onClick={increaseTextSize}
                  disabled={textSize === 'x-large'}
                  className="p-1 rounded-md text-gray-400 hover:text-gray-500 disabled:opacity-50"
                  title="Increase text size"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Emergency button */}
            <button
              onClick={handleEmergency}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium flex items-center"
            >
              <PhoneIcon className="h-4 w-4 mr-1" />
              Emergency Help
            </button>

            {/* User info */}
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">
                    {user?.name || 'User'} ({user?.role || 'guest'})
                  </span>
                  <button
                    onClick={logout}
                    className="text-gray-400 hover:text-gray-600 text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EnhancedHeader;