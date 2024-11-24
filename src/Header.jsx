import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LogoutLink } from './LogoutLink';
import apiClient from './config/axios';

const Header = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const getUserData = () => {
    apiClient.get('/current.json').then(response => {
      setCurrentUser(response.data);
    });
  };

  useEffect(getUserData, []);

  const authenticationLinks = localStorage.jwt === undefined ? (
    <div className="flex gap-4">
      <Link to="/signup" className="text-green-700 hover:text-green-900">Signup</Link>
      <Link to="/login" className="text-green-700 hover:text-green-900">Login</Link>
    </div>
  ) : (
    <LogoutLink />
  );

  const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/products', text: 'Browse' },
    { href: '/carted_products', text: 'Shopping Cart' },
    { href: '/orders', text: 'My Orders' },
    { href: '/products/new', text: 'Create new product' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-green-800">Shopping 4 US</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-700 hover:text-green-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.text}
              </Link>
            ))}
            <div className="pl-6 border-l border-gray-200">
              {authenticationLinks}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-800 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-800 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.text}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {authenticationLinks}
            </div>
          </div>
        </div>
      </nav>
      
      {currentUser.name && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <h2 className="text-lg font-medium text-gray-900">
            Hello, {currentUser.name}
          </h2>
        </div>
      )}
    </header>
  );
};

export default Header;