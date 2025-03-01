import { Navigate } from "react-router-dom";
import { useAuth } from "../useAuth";

function ProtectedRoute({ children }) {
  const isAuthorized = useAuth();

  if (isAuthorized === null) {
    return <div>Ładowanie strony...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
