import { User } from '../types/auth';

interface ValidationErrors {
  [key: string]: string;
}

export const validateRegistrationForm = (formData: Partial<User>): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.username) {
    errors.username = 'Username is required';
  } else if (!/^[a-zA-Z0-9]{8}$/.test(formData.username)) {
    errors.username = 'Username must be exactly 8 alphanumeric characters';
  }

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
    errors.password = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
  }

  if (!formData.gender) {
    errors.gender = 'Gender is required';
  }

  if (!formData.telephone) {
    errors.telephone = 'Telephone is required';
  }

  return errors;
};
