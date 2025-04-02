import { User } from "../types/auth";

interface ValidationErrors {
  [key: string]: string;
}

export const validateRegistrationForm = (
  formData: Partial<User>
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.username) {
    errors.username = "Username is required";
  } else if (formData.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
    errors.username = "Username can only contain letters and numbers";
  }

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      formData.password
    )
  ) {
    errors.password =
      "Password must have uppercase, lowercase, number and special character";
  }

  if (!formData.gender) {
    errors.gender = "Gender is required";
  }

  if (!formData.telephone) {
    errors.telephone = "Telephone is required";
  }

  return errors;
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string): boolean => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );
};

export const validateUsername = (username: string): boolean => {
  return username.trim().length >= 3;
};

export const validateFullName = (name: string): boolean => {
  return name.trim().length >= 3;
};

export const validatePhone = (phone: string): boolean => {
  return /^\d{10,15}$/.test(phone.replace(/[-()\s]/g, ""));
};
