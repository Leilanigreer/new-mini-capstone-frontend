import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';

export function LogoutLink() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    logout(); // Use the logout function from AuthContext
    navigate('/');
  };

  return (
    <a href="/" onClick={handleClick}>
      Logout
    </a>
  );
}