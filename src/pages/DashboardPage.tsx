import React from 'react';
import { Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import UserDashboard from '../components/dashboard/UserDashboard';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const DashboardPage: React.FC = () => {
  const { authState } = useAuth();
  
  if (authState.loading) {
    return <LoadingSpinner />;
  }
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <DashboardLayout>
      {authState.user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </DashboardLayout>
  );
};

export default DashboardPage;