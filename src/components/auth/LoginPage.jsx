// src/components/auth/LoginPage.jsx
import { useState, useEffect } from "react";
import { Mail, Lock, AlertCircle, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import apiClient from "../../config/axios";


export function LoginPage() {
  const [errors, setErrors] = useState([]);
  const { login, getUserData } = useAuth();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      const timer = setTimeout(() => {
        setMessage("");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    params.set('email', params.get('email').toLocaleLowerCase());
    
    try {
      setIsLoading(true);
      const response = await apiClient.post("/sessions.json", params);
      const token = response.data.jwt;
      login(null, token);  
      await getUserData();
      event.target.reset();
      navigate('/products');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        setErrors(["Invalid email or password"]);
      } else {
        setErrors(["An error occurred. Please try again."]);
      }
    }
  };

  const handleDemoLogin = async (type) => {
    setErrors([]);
    const credentials = {
      admin: {
        email: 'leilani+admin@test.com',
        password: 'admin'
      },
      user: {
        email: 'leilani@test.com',
        password: 'password'
      }
    };

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.set('email', credentials[type].email);
      formData.set('password', credentials[type].password);
      
      const response = await apiClient.post("/sessions.json", formData);
      const token = response.data.jwt;
      login(null, token);
      await getUserData();
      navigate('/products');
    } catch (error) {
      console.error('Demo login error:', error);
      setErrors(["Failed to log in with demo account. Please try again."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
      {message && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-700 items-center" role="alert">
            {message}
          </div>
        )}
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Login to Shopping 4 US
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <ul className="list-disc list-inside text-sm text-red-600">
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                         shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 
                         transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          
          {/* Demo Access Section */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Try a demo account</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDemoLogin('user')}
                disabled={isLoading}
                className="flex justify-center items-center px-4 py-2 border border-green-700 
                         rounded-md shadow-sm text-sm font-medium text-green-700 bg-white 
                         hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-green-700 transition-colors duration-200 disabled:opacity-50"
              >
                <User className="h-4 w-4 mr-2" />
                Demo User
              </button>

              <button
                onClick={() => handleDemoLogin('admin')}
                disabled={isLoading}
                className="flex justify-center items-center px-4 py-2 border border-green-700 
                         rounded-md shadow-sm text-sm font-medium text-green-700 bg-white 
                         hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-green-700 transition-colors duration-200 disabled:opacity-50"
              >
                <ShieldCheck className="h-4 w-4 mr-2" />
                Demo Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}