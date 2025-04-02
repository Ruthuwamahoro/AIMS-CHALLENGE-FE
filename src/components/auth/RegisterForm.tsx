import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaSpinner } from 'react-icons/fa';
import { User } from '../../types/auth';
import { validateRegisterForm } from '../../utils/validation';
import { Link } from 'react-router-dom';

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
    const { valid, errors } = validateRegisterForm(formData);
    setFormErrors(errors);
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
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await onSubmit({ ...formData });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xlspace-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Full Name', name: 'fullName', icon: <FaUser />, type: 'text', placeholder: 'John Doe' },
            { label: 'Username', name: 'username', icon: <FaUser />, type: 'text', placeholder: 'johndoe' },
            { label: 'Email', name: 'email', icon: <FaEnvelope />, type: 'email', placeholder: 'email@example.com' },
            { label: 'Telephone', name: 'telephone', icon: <FaPhone />, type: 'tel', placeholder: '+1 (234) 567-8901' },
            { label: 'Password', name: 'password', icon: <FaLock />, type: 'password', placeholder: '••••••••' },
            { label: 'Confirm Password', name: 'confirmPassword', icon: <FaLock />, type: 'password', placeholder: '••••••••' }
          ].map(({ label, name, icon, type, placeholder }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium">{label}</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-indigo-500">{icon}</span>
                <input
                  type={type}
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="pl-10 w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              {formErrors[name as keyof typeof formErrors] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[name as keyof typeof formErrors]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {formErrors.gender && <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-white bg-gray-900 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 flex items-center justify-center"
          >
            {isSubmitting ? (
              <><FaSpinner className="animate-spin mr-2" /> Creating Account...</>
            ) : (
              'Create Account'
            )}
          </button>
           <div className="text-center pt-0">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
