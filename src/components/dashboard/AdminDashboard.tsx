import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/user';
import showToast from '../ui/showToast';
import { userData } from '../../types/auth';
import UserTable from './userTable';
import LoadingSpinner from '../ui/LoadingSpinner';

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
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Admin Dashboard</h2>
          <p className="mt-1 text-sm text-gray-500">Manage users and view system statistics</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-purple-700">Total Users</h3>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-700">Admins</h3>
            <p className="text-2xl font-bold">
              {users.filter(user => user.role === 'admin').length}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-700">Regular Users</h3>
            <p className="text-2xl font-bold">
              {users.filter(user => user.role !== 'admin').length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">User Management</h2>
        </div>
        <div className="border-t border-gray-200 max-h-[600px] overflow-y-auto">
          <UserTable users={users} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;