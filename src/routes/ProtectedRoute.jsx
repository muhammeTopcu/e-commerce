import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const user = useSelector((state) => state.client.user);
  const token = localStorage.getItem("token");

  if (!user?.email && !token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default ProtectedRoute;
