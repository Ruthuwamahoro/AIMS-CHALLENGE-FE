import React from 'react';
import { userData } from '../../types/auth';

interface UserTableProps {
  users: userData[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  console.log("responsee", users)
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id || user.email}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.username}
                  {user.fullName && (
                    <div className="text-sm text-gray-500">{user.fullName}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.role || 'user'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;