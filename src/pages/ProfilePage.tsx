import React from 'react';
import { Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import UserDashboard from '../components/dashboard/UserDashboard';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProfilePage: React.FC = () => {
  const { authState } = useAuth();
  
  if (authState.loading) {
    return <LoadingSpinner />;
  }
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <DashboardLayout>
      <UserDashboard />
    </DashboardLayout>
  );
};

export default ProfilePage;
