import React from 'react';
import Layout from '../components/layout/Layout';
import UserDashboard from '../components/dashboard/UserDashboard';
// import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
//   const { authState } = useAuth();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <UserDashboard />
      </div>
    </Layout>
  );
};

export default Dashboard;