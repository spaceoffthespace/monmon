import { Navigate, useLocation } from "react-router-dom";
import { useContext } from 'react';

import { AuthContext } from "../../Context/AuthContext";
function ProtectedRoute({ element, ...rest }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return user
    ? element
    : <Navigate to="/login" state={{ from: location }} replace />;
}

export default ProtectedRoute;
