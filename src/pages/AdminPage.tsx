import React from 'react';
import { Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const AdminPage: React.FC = () => {
  const { authState } = useAuth();
  
  if (authState.loading) {
    return <LoadingSpinner />;
  }
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (authState.user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <DashboardLayout>
      <AdminDashboard />
    </DashboardLayout>
  );
};

export default AdminPage