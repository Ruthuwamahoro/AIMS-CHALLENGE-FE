import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/auth';
import { authApi } from '../services/auth';

const Dashboard = () => {
  const { authState: { user, isAuthenticated }, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      if (user?.role === 'admin') {
        try {
          setLoading(true);
          const response = await authApi.get('/users');
          
          // Debug what's coming back
          console.log("API Response:", response);
          
          // Check if response.data is an array directly
          if (Array.isArray(response.data)) {
            setUsers(response.data);
          } 
          // If data is nested in a data property (common in REST APIs)
          else if (response.data && Array.isArray(response.data.data)) {
            setUsers(response.data.data);
          }
          // If data is nested in a users property
          else if (response.data && Array.isArray(response.data.users)) {
            setUsers(response.data.users);
          }
          // Handle case when no users are found
          else if (response.data && Object.keys(response.data).length === 0) {
            setUsers([]);
            console.log("No users found");
          }
          // Error case - data is not in expected format
          else {
            setUsers([]);
            console.error("Unexpected data format:", response.data);
            setError('Invalid data format received from server');
          }
        } catch (error) {
          const err = error as Error
          setError('Failed to fetch users: ' + (err.message || 'Unknown error'));
          setUsers([]);
        } finally {
          setLoading(false);
        }
      } else {
        // If user is not admin, don't need to fetch users
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user?.role, isAuthenticated, navigate]);



  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* User Profile Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Full Name</p>
              <p className="font-medium">{user?.fullName}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Role</p>
              <p className="font-medium capitalize">{user?.role}</p>
            </div>
            {user?.telephone && (
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="font-medium">{user.telephone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Admin Section - Users List */}
        {user?.role === 'admin' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            {error && (
              <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Array.isArray(users) && users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.email}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {user.fullName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {user.role}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;