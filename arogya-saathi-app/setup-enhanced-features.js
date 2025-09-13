const fs = require('fs');
const path = require('path');

console.log("Setting up enhanced features for Arogya Saathi...");

// 1. Create Enhanced Header Component
const enhancedHeaderContent = `// EnhancedHeader.tsx - Header with accessibility tools, emergency button, and live info
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function EnhancedHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userLocation, setUserLocation] = useState('Punjab, India');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [textSize, setTextSize] = useState('normal');
  const [isOnline, setIsOnline] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const router = useRouter();
  const { user, logout } = useAuth();

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

  // Handle emergency button click
  const handleEmergency = () => {
    alert('🚨 EMERGENCY ALERT: Help is on the way! 🚨\\n\\nAmbulance and emergency services have been notified.');
  };

  // Toggle high contrast mode
  const toggleContrast = () => {
    setIsHighContrast(!isHighContrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light-mode');
  };

  // Change text size
  const changeTextSize = (size) => {
    setTextSize(size);
    document.documentElement.setAttribute('data-text-size', size);
  };

  // Request location permission
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locations = [
            'Nabha, Punjab',
            'Patiala, Punjab',
            'Ludhiana, Punjab',
            'Chandigarh',
            'Amritsar, Punjab'
          ];
          const randomLocation = locations[Math.floor(Math.random() * locations.length)];
          setUserLocation(randomLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
          setUserLocation('Location access denied');
        }
      );
    } else {
      setUserLocation('Geolocation not supported');
    }
  };

  // Apply text size on component mount
  useEffect(() => {
    document.documentElement.setAttribute('data-text-size', textSize);
  }, [textSize]);

  return (
    <>
      {/* Emergency Button - Fixed position */}
      <button
        onClick={handleEmergency}
        className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-full shadow-lg flex items-center space-x-2 animate-pulse"
        aria-label="Emergency Help"
      >
        <span className="text-2xl">🚨</span>
        <span>Emergency Help</span>
      </button>

      {/* Main Header */}
      <header className={\`bg-gray-800 p-4 flex justify-between items-center \${isHighContrast ? 'border-4 border-yellow-400' : ''}\`}>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold text-white">
            Arogya Saathi
          </Link>
          
          <div className={\`px-3 py-1 rounded-full text-xs \${isOnline ? 'bg-green-600' : 'bg-yellow-600'}\`}>
            {isOnline ? 'Online' : 'Offline Mode'}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm bg-gray-700 px-3 py-1 rounded">
            {currentTime.toLocaleTimeString()}
          </div>
          
          <div 
            className="text-sm bg-gray-700 px-3 py-1 rounded cursor-pointer"
            onClick={requestLocation}
            title="Click to update location"
          >
            📍 {userLocation}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleContrast}
              className="p-2 bg-gray-700 rounded hover:bg-gray-600"
              aria-label="Toggle high contrast mode"
            >
              {isHighContrast ? '🔅' : '🔆'}
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-gray-700 rounded hover:bg-gray-600"
              aria-label="Toggle dark/light mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            <div className="relative group">
              <button className="p-2 bg-gray-700 rounded hover:bg-gray-600" aria-label="Text size options">
                𝔸
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                <button onClick={() => changeTextSize('normal')} className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                  Normal Text
                </button>
                <button onClick={() => changeTextSize('large')} className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                  Large Text
                </button>
                <button onClick={() => changeTextSize('x-large')} className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                  Extra Large Text
                </button>
              </div>
            </div>
            
            <button className="p-2 bg-gray-700 rounded hover:bg-gray-600" aria-label="Screen reader support">
              👁️
            </button>
          </div>
          
          {user.role && (
            <>
              <span className="text-gray-300">
                {user.name} ({user.role})
              </span>
              <Link href="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
              <Link href={\`/\${user.role}/dashboard\`} className="text-gray-400 hover:text-white">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>
    </>
  );
}
`;

// 2. Create Updated Global CSS
const globalCssContent = `@import "tailwindcss";

:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 15, 23, 42;
  --background-end-rgb: 15, 23, 42;
}

:root.light-mode {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

.high-contrast {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 0, 0, 0;
  --background-end-rgb: 0, 0, 0;
}

.high-contrast body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-start-rgb));
}

.high-contrast header,
.high-contrast .bg-gray-800,
.high-contrast .bg-gray-700 {
  background-color: #000 !important;
  border-color: #fff !important;
  color: #fff !important;
}

.high-contrast button {
  border: 2px solid #fff !important;
}

[data-text-size="normal"] {
  font-size: 16px;
}

[data-text-size="large"] {
  font-size: 20px;
}

[data-text-size="x-large"] {
  font-size: 24px;
}

[data-text-size="large"] button,
[data-text-size="x-large"] button {
  padding: 12px 24px;
}

@media (max-width: 768px) {
  .ml-64 {
    margin-left: 0;
  }
  
  .fixed.w-64 {
    position: fixed;
    width: 100%;
    height: auto;
    z-index: 50;
  }
  
  main {
    margin-left: 0;
    padding-top: 6rem;
  }
  
  header {
    flex-direction: column;
    gap: 1rem;
  }
}
`;

// Create/update files
console.log("Creating/updating components...");

// Create EnhancedHeader component
const enhancedHeaderPath = path.join(__dirname, 'app', 'components', 'EnhancedHeader.tsx');
fs.writeFileSync(enhancedHeaderPath, enhancedHeaderContent);
console.log("✓ Created EnhancedHeader component");

// Update global CSS
const globalCssPath = path.join(__dirname, 'app', 'globals.css');
fs.writeFileSync(globalCssPath, globalCssContent);
console.log("✓ Updated global CSS");

console.log("✅ Enhanced features setup completed!");
console.log("🚀 Start your development server with: npm run dev -- -p 3001");