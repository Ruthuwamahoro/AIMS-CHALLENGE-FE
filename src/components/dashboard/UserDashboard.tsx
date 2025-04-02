import React from 'react';
import { useAuth } from '../../context/AuthContext';

const UserDashboard: React.FC = () => {
  const { authState } = useAuth();
  const user = authState.user;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="border-b border-gray-200 pb-5 mb-5">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-2 text-sm text-gray-500">
          Welcome back, {user?.fullName || user?.username || 'User'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-purple-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-purple-800">Account Type</h3>
          <p className="text-xl font-semibold text-purple-600 capitalize">
            {user?.role || 'User'}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-blue-800">Email</h3>
          <p className="text-xl font-semibold text-blue-600">{user?.email}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200">
            <svg
              className="w-6 h-6 text-purple-500 mx-auto mb-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-600 text-center">
              Edit Profile
            </p>
          </button>
          <button className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200">
            <svg
              className="w-6 h-6 text-purple-500 mx-auto mb-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-600 text-center">
              Change Password
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;