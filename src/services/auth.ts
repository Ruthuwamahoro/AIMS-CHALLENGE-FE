import axios from "axios";
import { User } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not defined');
}

export const authApi = axios.create({
  baseURL: API_URL,
});

// Add authorization header to requests if token exists
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (identifier: string, password: string) => {
  try {
    const res = await authApi.post(`/auth/login`, {
      identifier,
      password,
    });
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      return res.data;
    }
    return null;
  } catch (error) {
    // Pass through the server error message
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Invalid credentials");
  }
};

export const registerService = async (userData: User) => {
  try {
    console.log("Starting registration process");
    const res = await authApi.post(`/auth/signup`, userData);
    console.log("Registration response:", res.data);
    
    // Return the response in a consistent format
    return {
      success: res.status === 201,
      data: res.data.data,
      message: res.data.message,
      status: res.status
    };
  } catch (error: unknown) {
    console.error("Registration error:", error);
    
    // Handle Axios errors with response data
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || "Registration failed";
      // Throw a structured error object
      throw {
        success: false,
        message: errorMessage,
        status: error.response.status
      };
    }
    
    // Generic error handling
    const err = error as Error;
    throw {
      success: false,
      message: err.message || "Registration failed",
      status: 500
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(window.atob(base64));

    if (payload.id) {
      return {
        id: payload.id,
        identifier: payload.identifier,
        role: payload.role || "user",
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};
