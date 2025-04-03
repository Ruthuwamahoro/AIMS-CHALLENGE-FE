export interface User {
  id?: string;
  fullName?: string;
  username?: string;
  identifier?: string;
  email: string;
  gender?: string;
  password?: string;
  telephone?: string;
  role?: "admin" | "user";
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType {
  authState: AuthState;
  login: (identifier: string, password: string) => Promise<boolean>;
  register: (userData: User) => Promise<boolean>;
  logout: () => void;
  clearErrors: () => void;
}

export interface userData {
  id: string;
  username: string;
  email: string;
  role: string;
  fullName: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  gender: string;
  telephone: string;
  password: string;
}
