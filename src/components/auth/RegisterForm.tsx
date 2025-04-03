import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaSpinner, FaCheck, FaTimes, FaShieldAlt } from 'react-icons/fa';
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

  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const [showPasswordDetails, setShowPasswordDetails] = useState(false);

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

  useEffect(() => {
    const password = formData.password;
        setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    });
  }, [formData.password]);

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

  const passwordStrength = Object.values(passwordRequirements).filter(Boolean).length;
  
  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const formFields = [
    { label: 'Full Name', name: 'fullName', icon: <FaUser />, type: 'text', placeholder: 'John Doe' },
    { label: 'Username', name: 'username', icon: <FaUser />, type: 'text', placeholder: 'johndoe' },
    { label: 'Email', name: 'email', icon: <FaEnvelope />, type: 'email', placeholder: 'email@example.com' },
    { label: 'Telephone', name: 'telephone', icon: <FaPhone />, type: 'tel', placeholder: '+1 (234) 567-8901' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {formFields.map(({ label, name, icon, type, placeholder }) => (
          <div key={name} className="space-y-1">
            <label className="block text-gray-300 text-sm font-medium">{label}</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-purple-400">{icon}</span>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className="pl-10 w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white focus:outline-none text-sm"
              />
            </div>
            {formErrors[name as keyof typeof formErrors] && (
              <p className="text-red-400 text-xs">{formErrors[name as keyof typeof formErrors]}</p>
            )}
          </div>
        ))}
        
        <div className="space-y-1">
          <label className="block text-gray-300 text-sm font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white focus:outline-none text-sm"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formErrors.gender && <p className="text-red-400 text-xs">{formErrors.gender}</p>}
        </div>
        
        <div className="space-y-1">
          <label className="block text-gray-300 text-sm font-medium">Password</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-purple-400"><FaLock /></span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="pl-10 w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white focus:outline-none text-sm"
            />
            {formData.password && (
              <button 
                type="button"
                onClick={() => setShowPasswordDetails(!showPasswordDetails)}
                className="absolute right-3 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <FaShieldAlt />
              </button>
            )}
          </div>
          
          {formData.password && (
            <div className="mt-1">
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400">Password Strength</div>
                <div className="text-xs">
                  {passwordStrength <= 2 && "Weak"}
                  {passwordStrength > 2 && passwordStrength <= 4 && "Medium"}
                  {passwordStrength > 4 && "Strong"}
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                <div 
                  className={`h-1 rounded-full ${getStrengthColor()}`} 
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
          
          {formErrors.password && (
            <p className="text-red-400 text-xs">{formErrors.password}</p>
          )}
          
          {formData.password && showPasswordDetails && (
            <div className="absolute z-10 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg w-64">
              <div className="text-xs font-medium text-gray-300 mb-2">Password Requirements:</div>
              <div className="space-y-1">
                <div className="flex items-center">
                  {passwordRequirements.length ? (
                    <FaCheck className="text-green-400 mr-1" />
                  ) : (
                    <FaTimes className="text-red-400 mr-1" />
                  )}
                  <span className={passwordRequirements.length ? "line-through text-green-400 text-xs" : "text-xs"}>
                    8+ characters
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordRequirements.uppercase ? (
                    <FaCheck className="text-green-400 mr-1" />
                  ) : (
                    <FaTimes className="text-red-400 mr-1" />
                  )}
                  <span className={passwordRequirements.uppercase ? "line-through text-green-400 text-xs" : "text-xs"}>
                    Uppercase letter
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordRequirements.lowercase ? (
                    <FaCheck className="text-green-400 mr-1" />
                  ) : (
                    <FaTimes className="text-red-400 mr-1" />
                  )}
                  <span className={passwordRequirements.lowercase ? "line-through text-green-400 text-xs" : "text-xs"}>
                    Lowercase letter
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordRequirements.number ? (
                    <FaCheck className="text-green-400 mr-1" />
                  ) : (
                    <FaTimes className="text-red-400 mr-1" />
                  )}
                  <span className={passwordRequirements.number ? "line-through text-green-400 text-xs" : "text-xs"}>
                    Number
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordRequirements.special ? (
                    <FaCheck className="text-green-400 mr-1" />
                  ) : (
                    <FaTimes className="text-red-400 mr-1" />
                  )}
                  <span className={passwordRequirements.special ? "line-through text-green-400 text-xs" : "text-xs"}>
                    Special character
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <label className="block text-gray-300 text-sm font-medium">Confirm Password</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-purple-400"><FaLock /></span>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="pl-10 w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white focus:outline-none text-sm"
            />
          </div>
          {formErrors.confirmPassword && (
            <p className="text-red-400 text-xs">{formErrors.confirmPassword}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center text-sm mt-4"
      >
        {isSubmitting ? (
          <><FaSpinner className="animate-spin mr-2" /> Creating Account...</>
        ) : (
          'Create Account'
        )}
      </button>
      
      <div className="text-center">
        <p className="text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;