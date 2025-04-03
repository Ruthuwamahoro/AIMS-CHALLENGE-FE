/* eslint-disable no-useless-catch */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User } from '../types/auth';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleFormSubmit = async (userData: User) => {
    try {
      setIsSubmitting(true);
      const success = await register(userData);
        
      if (success) {
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
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
              <h2 className="text-3xl font-bold mb-3">Welcome!</h2>
              <p className="mb-6 text-gray-200">Join our community and unlock a world of features.</p>
              <div className="w-16 h-1 bg-purple-200 mx-auto rounded-full mb-6"></div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-sm italic">"Happy world with your new account"</p>
                <p className="text-xs mt-2">— Featured Review</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-7/12 p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
              <p className="mt-1 text-sm text-gray-400">Complete the form below to get started</p>
            </div>
            
            <RegisterForm
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;