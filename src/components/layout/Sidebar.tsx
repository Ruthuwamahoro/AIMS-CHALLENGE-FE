import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { authState } = useAuth();
  const isAdmin = authState.user?.role === 'admin';

  return (
    <div className="bg-white shadow-md rounded-lg h-full p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-purple-600 mb-2">Dashboard</h2>
        <p className="text-sm text-gray-500">Welcome, {authState.user?.fullName || authState.user?.username || 'User'}</p>
      </div>
      <nav className="space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
            }`
          }
          end
        >
          <svg
            className="text-gray-400 group-hover:text-purple-500 mr-3 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
            }`
          }
        >
          <svg
            className="text-gray-400 group-hover:text-purple-500 mr-3 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Profile
        </NavLink>
        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
              }`
            }
          >
            <svg
              className="text-gray-400 group-hover:text-purple-500 mr-3 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            Admin Panel
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;