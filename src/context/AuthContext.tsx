import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, AuthContextType, User } from '../types/auth';
import { login as loginService, register as registerService, getCurrentUser } from '../services/auth';
import showToast from '../components/ui/showToast';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null
};

// Define action types
type AuthAction = 
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'USER_LOADED'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERRORS' };

// Create reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          dispatch({ type: 'USER_LOADED', payload: user as unknown as User });
        } else {
          dispatch({ type: 'AUTH_ERROR', payload: 'Authentication failed' });
        }
      } catch (error: unknown) {
        const err = error as Error;
        console.log(err)
        dispatch({ type: 'AUTH_ERROR', payload: 'Authentication failed' });
      }
    };
    
    loadUser();
  }, []);

  const login = async (identifier: string, password: string): Promise<boolean> => {
    try {
      const data = await loginService(identifier, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
      showToast('Login successful', 'success');
      return true;
    } catch (error: unknown) {
      const err = error as Error
      const errorMessage = err.message || 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      showToast(errorMessage, 'error');
      return false;
    }
  };

  const register = async (userData: User): Promise<boolean> => {
    try {
      const data = await registerService(userData);
      // If your backend returns the user after registration
      if (data.success) {
        dispatch({ type: 'REGISTER_SUCCESS', payload: data.data });
        showToast('Registration successful', 'success');
        return true;
      } else {
        // If registration is successful but requires login afterwards
        showToast('Registration successful. Please login.', 'success');
        return true;
      }
    } catch (error: unknown) {
      const err = error as Error
      const errorMessage = err.message || 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      showToast(errorMessage, 'error');
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    showToast('Logged out successfully', 'success');
  };

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <AuthContext.Provider
      value={{
        authState: state,
        login,
        register,
        logout,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};