import React, { createContext, useState, useEffect } from 'react';
import CallApi from '../utils/callApi';
import { backend_path } from '../utils/enum';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user data in local storage when the component mounts
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      const response = await CallApi.post(backend_path.LOGIN, userData);
      const userWithRole = response.data;
  
      // Store user data
      setUser(userWithRole);
      localStorage.setItem('user', JSON.stringify(userWithRole));
  
      return {
        user: userWithRole,
        redirectTo: userWithRole.role === 'ADMIN' ? '/admin' : '/dashboard'
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (userData) => {
    try {
      const response = await CallApi.post(backend_path.REGISTER, userData);
      
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};