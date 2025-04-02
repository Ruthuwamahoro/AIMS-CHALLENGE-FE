import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, AuthContextType, User } from '../types/auth';
import { login as loginService, registerService, getCurrentUser } from '../services/auth';
import showToast from '../components/ui/showToast';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null
};

type AuthAction = 
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'USER_LOADED'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERRORS' };

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      const result = await registerService(userData);
      
      console.log("Registration result:", result);
      
      if (result.success) {
        if (result.data) {
          dispatch({ type: 'REGISTER_SUCCESS', payload: result.data });
        }
        
        showToast(result.message || 'Registration successful', 'success');
        return true;
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: result.message || 'Registration failed' });
        showToast(result.message || 'Registration failed', 'error');
        return false;
      }
    } catch (err: unknown) {
      const error = err as Error
       const errorMessage = error.message || 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      showToast(errorMessage, 'error');
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
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

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthContext };
