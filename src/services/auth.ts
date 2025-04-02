import axios from "axios";
import { User } from "../types/auth";

// Use environment variable or default to localhost
const API_URL = "http://localhost:8000/api";

// Create axios instance with authorization header
export const authApi = axios.create({
  baseURL: API_URL
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
  // eslint-disable-next-line no-useless-catch
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
    throw error;
  }
};

export const register = async (userData: User) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await authApi.post(`/auth/signup`, userData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    if (payload.id) {
      return {
        id: payload.id,
        identifier: payload.identifier,
        role: payload.role || 'user'
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};