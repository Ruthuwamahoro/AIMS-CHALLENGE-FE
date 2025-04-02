import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
        <FaSpinner className="animate-spin text-indigo-600 text-4xl mb-4" />
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
