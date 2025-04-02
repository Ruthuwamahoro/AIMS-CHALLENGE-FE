/* eslint-disable no-useless-catch */
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-indigo-700">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join our community today</p>
        </div>

        <RegisterForm 
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </div>
    </div>
  );
};

export default RegisterPage;