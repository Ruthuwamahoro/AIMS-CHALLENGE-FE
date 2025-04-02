import React from 'react';
import Layout from '../components/layout/Layout';
import AdminDashboard from '../components/dashboard/AdminDashboard';

const AdminPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <AdminDashboard />
      </div>
    </Layout>
  );
};

export default AdminPage;