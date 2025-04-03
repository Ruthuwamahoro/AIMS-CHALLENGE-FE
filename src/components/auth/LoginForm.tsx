import React, { useState } from 'react';
import { FaUser, FaLock, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import showToast from '../ui/showToast';

interface LoginFormProps {
  onSubmit: (identifier: string, password: string) => Promise<boolean>;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isSubmitting, setIsSubmitting }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      return await onSubmit(identifier, password);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Invalid credentials';
        showToast(message, 'error');
      } else {
        showToast('An unexpected error occurred', 'error');
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="block text-gray-300 text-sm font-medium">Email or Username</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-purple-400"><FaUser /></span>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="johndoe@example.com"
              required
              disabled={isSubmitting}
              className="pl-10 w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-gray-300 text-sm font-medium">Password</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-purple-400"><FaLock /></span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isSubmitting}
              className="pl-10 w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white focus:outline-none text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-purple-500 focus:ring-purple-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link to="/forgot-password" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
            Forgot password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center text-sm mt-4"
      >
        {isSubmitting ? (
          <><FaSpinner className="animate-spin mr-2" /> Signing in...</>
        ) : (
          'Sign in'
        )}
      </button>
    </form>
  );
};

export default LoginForm;