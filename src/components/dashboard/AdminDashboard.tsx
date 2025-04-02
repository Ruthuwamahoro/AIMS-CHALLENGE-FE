import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/user';
import showToast from '../ui/showToast';
import { userData } from '../../types/auth';
import UserTable from './userTable';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<userData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        showToast('Failed to load users', 'error');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="border-b border-gray-200 pb-5 mb-5">
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="mt-2 text-sm text-gray-500">
          Manage users and view system statistics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-purple-800">Total Users</h3>
          <p className="text-3xl font-bold text-purple-600">{users.length}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-blue-800">Admins</h3>
          <p className="text-3xl font-bold text-blue-600">
            {users.filter(user => user.role === 'admin').length}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-green-800">Regular Users</h3>
          <p className="text-3xl font-bold text-green-600">
            {users.filter(user => user.role !== 'admin').length}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-medium text-gray-900 mb-4">User Management</h3>
        <UserTable users={users} />
      </div>
    </div>
  );
};

export default AdminDashboard;