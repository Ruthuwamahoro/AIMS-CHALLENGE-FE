import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaSpinner } from 'react-icons/fa';
import { User } from '../../types/auth';
import showToast from '../ui/showToast';


interface RegisterFormProps {
  onSubmit: (userData: User) => Promise<void>;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isSubmitting, setIsSubmitting }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    gender: '',
    telephone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    username: '',
    email: '',
    gender: '',
    telephone: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
      valid = false;
    }

    if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      valid = false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
      valid = false;
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Phone number is required';
      valid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password does not meet requirements';
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please correct all errors before submitting', 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const userData: User = {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        gender: formData.gender,
        telephone: formData.telephone,
        password: formData.password
      };

      await onSubmit(userData);
    } catch (error: unknown) {
      const err = error as Error;
      showToast(err.message || 'Registration failed', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <FaUser />
          </div>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            className={`pl-10 block w-full px-3 py-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              formErrors.fullName ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
        {formErrors.fullName && (
          <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>
        )}
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <FaUser />
          </div>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleChange}
            className={`pl-10 block w-full px-3 py-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              formErrors.username ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
        {formErrors.username && (
          <p className="mt-1 text-sm text-red-600">{formErrors.username}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <FaEnvelope />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`pl-10 block w-full px-3 py-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              formErrors.email ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
        {formErrors.email && (
          <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          required
          value={formData.gender}
          onChange={handleChange}
          className={`block w-full px-3 py-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            formErrors.gender ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {formErrors.gender && (
          <p className="mt-1 text-sm text-red-600">{formErrors.gender}</p>
        )}
      </div>

      <div>
        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
          Telephone
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <FaPhone />
          </div>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            required
            value={formData.telephone}
            onChange={handleChange}
            className={`pl-10 block w-full px-3 py-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              formErrors.telephone ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
        {formErrors.telephone && (
          <p className="mt-1 text-sm text-red-600">{formErrors.telephone}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <FaLock />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className={`pl-10 block w-full px-3 py-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              formErrors.password ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
        {formErrors.password && (
          <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Must have uppercase, lowercase, number and special character (@$!%*?&)
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <FaLock />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`pl-10 block w-full px-3 py-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              formErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
        {formErrors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
          isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
};

export default RegisterForm;