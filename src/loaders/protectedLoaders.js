import { redirect } from "react-router-dom";
import apiClient from "../config/axios";

const getAuthState = async () => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return { isAuthenticated: false };
  }
  
  try {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await apiClient.get("/users/current.json");
    return {
      isAuthenticated: true,
      user: response.data,
      isAdmin: response.data.role === 'admin',
      isShopper: response.data.role === 'shopper'
    };
  } catch (error) {
    console.error('Auth check failed:', error);
    localStorage.removeItem('jwt');
    delete apiClient.defaults.headers.common["Authorization"];
    return { isAuthenticated: false };
  }
};

export const adminLoader = (loaderFn) => async (...args) => {
  const authState = await getAuthState();
  
  if (!authState.isAuthenticated) {
    return redirect('/login');
  }
  
  if (!authState.isAdmin) {
    return redirect('/');
  }
  
  return loaderFn(...args);
};

export const shopperLoader = (loaderFn) => async (...args) => {
  const authState = await getAuthState();
  
  if (!authState.isAuthenticated) {
    return redirect('/login');
  }
  
  if (!authState.isShopper) {
    return redirect('/');
  }
  
  return loaderFn(...args);
};

export const protectedLoader = (loaderFn) => async (...args) => {
  const authState = await getAuthState();
  
  if (!authState.isAuthenticated) {
    return redirect('/login');
  }
  
  return loaderFn(...args);
};

export const authLoader = async (path) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return apiClient.get(path).then(response => response.data);
};