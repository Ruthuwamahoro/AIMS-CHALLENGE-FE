import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import { Toaster } from 'react-hot-toast';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; 
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { authState } = useAuth();

  if (authState.loading) {
    return <LoadingSpinner />;
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && authState.user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

function App() {
  const { authState } = useAuth();

  if (authState.loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/login" element={
            authState.isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
          } />
          <Route path="/register" element={
            authState.isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPage />
            </ProtectedRoute>
          } />
          
          <Route path="/" element={
            authState.isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          } />
          
          <Route path="*" element={
            authState.isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;