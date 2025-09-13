'use client';

import React, { useState, useEffect } from 'react';

// Simple user data storage
export const useSimpleAuth = () => {
  const [user, setUser] = useState({ 
    role: null as string | null, 
    email: null as string | null, 
    name: null as string | null 
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on component mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (role: string, email: string, name: string) => {
    const userData = { role, email, name };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser({ role: null, email: null, name: null });
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return {
    user,
    login,
    logout,
    isAuthenticated,
  };
};