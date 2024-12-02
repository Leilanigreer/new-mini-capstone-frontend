import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export const ShopperRoute = ({ children }) => {
  const { isShopper, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isShopper) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};