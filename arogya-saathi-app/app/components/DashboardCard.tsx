'use client';

import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  progress?: number;
  items?: Array<{ name: string; value: string | number }>;
  variant?: 'default' | 'warning' | 'danger' | 'success';
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  progress,
  items,
  variant = 'default'
}) => {
  const variantStyles = {
    default: 'border-blue-200 bg-blue-50',
    warning: 'border-yellow-200 bg-yellow-50',
    danger: 'border-red-200 bg-red-50',
    success: 'border-green-200 bg-green-50'
  };

  const textStyles = {
    default: 'text-blue-800',
    warning: 'text-yellow-800',
    danger: 'text-red-800',
    success: 'text-green-800'
  };

  return (
    <div className={`p-4 rounded-lg border ${variantStyles[variant]} shadow-sm`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-sm font-medium ${textStyles[variant]}`}>{title}</h3>
        <div className={textStyles[variant]}>{icon}</div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className={`text-2xl font-bold ${textStyles[variant]}`}>{value}</p>
          {subtitle && <p className={`text-xs ${textStyles[variant]}`}>{subtitle}</p>}
        </div>
      </div>

      {progress !== undefined && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {items && items.length > 0 && (
        <div className="mt-3 space-y-1">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between text-xs">
              <span className="text-gray-600">{item.name}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;