import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // While auth state is loading, don't render the route yet
  if (loading) return null; // You can replace with a spinner or loader if needed

  if (!user) {
    return <Navigate to="/login" replace />;
  }
 

  return children;
};

export default ProtectedRoute;