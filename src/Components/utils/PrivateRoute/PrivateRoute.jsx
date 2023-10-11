import React from 'react';
import { useNavigate, Route } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  let auth = useAuth();
  let navigate = useNavigate();

  return (
    <Route {...rest} render={() => {
      return auth.user
        ? children
        : navigate('/login');
    }} />
  );
};

export default PrivateRoute;
