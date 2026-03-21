import { useContext } from "react";
import { Navigate } from "react-router-dom";
import authcontext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { userData, loading } = useContext(authcontext);

 
  if (loading) {
    return <div>Loading authentication...</div>;
  }

 
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  
  return children;
};

export default ProtectedRoute;