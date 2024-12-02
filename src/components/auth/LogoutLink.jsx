// src/components/auth/LogoutLink.jsx
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';

export function LogoutLink({ className }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    logout(); // Use the logout function from AuthContext
    navigate('/');
  };

  // We're updating the return statement to include the animation classes
  // The structure matches our other navigation links for consistency
  return (
    <a 
      href="/" 
      onClick={handleClick}
      className={`${className} text-green-700 hover:text-green-900 relative group`}
    >
      Logout
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-700 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
    </a>
  );
}