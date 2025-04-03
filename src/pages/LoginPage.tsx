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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="md:flex">
          <div className="md:w-5/12 bg-gradient-to-br from-purple-600 to-indigo-800 p-8 flex flex-col justify-center items-center hidden md:block relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="w-40 h-40 rounded-full bg-white absolute -top-20 -left-20"></div>
              <div className="w-32 h-32 rounded-full bg-purple-300 absolute bottom-10 -right-10"></div>
            </div>
            
            <div className="relative z-10 text-white text-center">
              <h2 className="text-3xl font-bold mb-3">Welcome Back!</h2>
              <p className="mb-6 text-gray-200">Sign in to access your account and continue your journey.</p>
              <div className="w-16 h-1 bg-purple-200 mx-auto rounded-full mb-6"></div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-sm italic">"Seamless experience every time I log in."</p>
                <p className="text-xs mt-2">— Happy User</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-7/12 p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white">Sign In</h2>
              <p className="mt-1 text-sm text-gray-400">Enter your credentials to access your account</p>
            </div>
            
            <LoginForm
              onSubmit={handleLogin}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;