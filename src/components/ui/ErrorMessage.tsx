import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <div className={`flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 ${className}`}>
      <FaExclamationCircle className="flex-shrink-0 w-5 h-5 mr-2" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default ErrorMessage;
