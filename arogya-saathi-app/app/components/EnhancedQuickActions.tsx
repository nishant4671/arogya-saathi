'use client';

import React from 'react';
import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'emergency';
}

const QuickActionButton: React.FC<QuickActionProps> = ({
  title,
  description,
  icon,
  onClick,
  variant = 'default'
}) => {
  const baseClasses = "flex items-start p-4 rounded-lg border shadow-sm cursor-pointer transition-all hover:shadow-md";
  const variantClasses = {
    default: "bg-white border-gray-200 hover:bg-gray-50",
    emergency: "bg-red-50 border-red-200 hover:bg-red-100"
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      <div className="flex-shrink-0 mr-3">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};

interface EnhancedQuickActionsProps {
  role: string;
}

const EnhancedQuickActions: React.FC<EnhancedQuickActionsProps> = ({ role }) => {
  const handleFindFacility = () => {
    // Open Google Maps with healthcare facilities search
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        window.open(
          `https://www.google.com/maps/search/hospital+clinic+health+center/@${latitude},${longitude},12z`,
          '_blank'
        );
      }, () => {
        // Fallback if geolocation is denied or fails
        window.open('https://www.google.com/maps/search/hospital+clinic+health+center/', '_blank');
      });
    } else {
      window.open('https://www.google.com/maps/search/hospital+clinic+health+center/', '_blank');
    }
  };

  const handleMentalHealthHelp = () => {
    // Open national mental health helpline
    window.open('https://www.nimhans.ac.in/tele-manas/', '_blank');
  };

  const handleEmergencyAlert = () => {
    // Existing emergency functionality
    alert('Emergency alert activated! Connecting to emergency services...');
  };

  const handleQuickHelp = () => {
    // Existing quick help functionality
    alert('Quick help requested! Connecting to a healthcare professional...');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <QuickActionButton
          title="Find Facility Near Me"
          description="Locate nearby healthcare facilities on Google Maps"
          icon={<MapPinIcon className="h-6 w-6 text-blue-600" />}
          onClick={handleFindFacility}
        />
        
        <QuickActionButton
          title="Get Mental Health Help"
          description="Connect with national mental health resources"
          icon={<PhoneIcon className="h-6 w-6 text-green-600" />}
          onClick={handleMentalHealthHelp}
        />
        
        <QuickActionButton
          title="Emergency Alert"
          description="Immediate emergency assistance"
          icon={<PhoneIcon className="h-6 w-6 text-red-600" />}
          onClick={handleEmergencyAlert}
          variant="emergency"
        />
        
        <QuickActionButton
          title="Quick Help"
          description="Get immediate medical advice"
          icon={<PhoneIcon className="h-6 w-6 text-purple-600" />}
          onClick={handleQuickHelp}
        />
      </div>
    </div>
  );
};

export default EnhancedQuickActions;