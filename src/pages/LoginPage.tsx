import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (identifier: string, password: string): Promise<boolean> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const success = await login(identifier, password);
      
      if (success) {
        setTimeout(() => navigate('/dashboard'), 1000);
      }
      
      return success;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Sign in</h2>
        
        <LoginForm 
          onSubmit={handleLogin}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;