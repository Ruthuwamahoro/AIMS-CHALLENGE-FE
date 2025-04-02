import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { authState } = useAuth();
  
  const pathsWithSidebar = ['/dashboard', '/admin', '/profile'];
  const shouldShowSidebar = authState.isAuthenticated && pathsWithSidebar.some(path => location.pathname.startsWith(path));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-grow flex">
        {shouldShowSidebar && (
          <aside className="hidden md:block w-64 shrink-0 border-r border-gray-200 bg-white">
            <div className="h-full p-4">
              <Sidebar />
            </div>
          </aside>
        )}
        <main className={`flex-grow ${shouldShowSidebar ? 'md:ml-0' : ''}`}>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;