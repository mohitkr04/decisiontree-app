import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const isAuthenticated = true;

  console.log('ProtectedRoute: Authentication status:', isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}