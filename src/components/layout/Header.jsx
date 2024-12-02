import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { LogoutLink } from '../auth/LogoutLink';

const Header = () => {
  const { currentUser, isAdmin, isShopper, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const formatName = (fullName) => {
    if (!fullName) return '';
    const firstName = fullName.split(' ')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };

  const authenticationLinks = !isAuthenticated ? (
    <div className="flex gap-4">
      <Link 
        to="/signup" 
        className="text-sm md:text-xs lg:text-base text-green-700 hover:text-green-900 relative group"
        onMouseEnter={() => setHoveredLink('signup')}
        onMouseLeave={() => setHoveredLink(null)}
      >
        Signup
        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-700 transform origin-left transition-transform duration-300 ${hoveredLink === 'signup' ? 'scale-x-100' : 'scale-x-0'}`} />
      </Link>
      <Link 
        to="/login" 
        className="text-sm md:text-sm lg:text-base text-green-700 hover:text-green-900 relative group"
        onMouseEnter={() => setHoveredLink('login')}
        onMouseLeave={() => setHoveredLink(null)}
      >
        Login
        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-700 transform origin-left transition-transform duration-300 ${hoveredLink === 'login' ? 'scale-x-100' : 'scale-x-0'}`} />
      </Link>
    </div>
  ) : (
    <div className="flex gap-4 items-center">
      <span className="text-sm md:text-xs lg:text-base text-gray-700 font-medium">Hi, {formatName(currentUser?.name)}</span>
      <LogoutLink className="text-sm md:text-sm lg:text-base"/>
    </div>
  );

  const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/products', text: 'Browse' },
    ...(isShopper ? [
      { href: '/carted_products', text: 'Shopping Cart' },
      { href: '/orders', text: 'My Orders' },
    ] : []),
    ...(isAdmin ? [
      { href: '/products/new', text: 'Create new product' },
    ] : []),
  ];

  return (
    <header className="bg-white shadow-sm w-full">
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl md:text-lg lg:text-2xl font-bold text-green-800">Shopping 4 US</span>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm md:text-xs lg:text-base text-gray-700 hover:text-green-800 px-2 py-2 rounded-md font-medium relative"
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.text}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-800 transform origin-left transition-transform duration-300 ${
                      hoveredLink === link.href ? 'scale-x-100' : 'scale-x-0'
                    }`} 
                  />
                </Link>
              ))}
              <div className="pl-6 border-l border-gray-200">
                {authenticationLinks}
              </div>
            </div>
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-800 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-sm md:text-xs lg:text-base text-gray-700 hover:text-green-800 px-2 py-2 rounded-md font-medium relative group"
                  onClick={() => setIsOpen(false)}
                >
                  {link.text}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-800 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200">
                {authenticationLinks}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;