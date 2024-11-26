// src/context/AuthProvider.jsx
import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './auth-context';
import apiClient from '../config/axios';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAuthToken = useCallback((token) => {
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common["Authorization"];
    }
  }, []);

  const getUserData = useCallback(async () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setAuthToken(token);
      try {
        const response = await apiClient.get('/users/current.json');
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('jwt');
        setAuthToken(null);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
    setLoading(false);
  }, [setAuthToken]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const login = useCallback((_, token) => {
    localStorage.setItem('jwt', token);
    setAuthToken(token);
  }, [setAuthToken]);

  const logout = useCallback(() => {
    localStorage.removeItem('jwt');
    setAuthToken(null);
    setCurrentUser(null);
  }, [setAuthToken]);

  const value = {
    currentUser,
    loading,
    login,
    logout,
    getUserData,
    isAdmin: currentUser?.role === 'admin',
    isShopper: currentUser?.role === 'shopper',
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};