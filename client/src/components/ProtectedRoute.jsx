import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/" replace />;
  // NOTE: token validity/expiry is actually verified by backend; client-side check only checks presence
  return children;
}
