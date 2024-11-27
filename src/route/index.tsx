import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  if (localStorage.getItem('token')) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};
