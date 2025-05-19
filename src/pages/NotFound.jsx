import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-6xl font-bold text-blue-900">404</h1>
      <h2 className="mt-3 text-xl font-medium text-gray-900">Page Not Found</h2>
      <p className="mt-2 text-gray-600 text-center max-w-md">
        We couldn't find the page you were looking for. It might have been removed, renamed, or doesn't exist.
      </p>
      <div className="mt-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Home className="mr-2 h-4 w-4" />
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;