import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { TicketContext } from '../context/TicketContext';
import TicketForm from '../components/tickets/TicketForm';

const SubmitTicket = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newTicketId, setNewTicketId] = useState(null);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleSubmitSuccess = (newTicket) => {
    setNewTicketId(newTicket.id);
    setIsSubmitted(true);
    
    // Auto redirect after 3 seconds
    setTimeout(() => {
      navigate(`/ticket/${newTicket.id}`);
    }, 3000);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Submit a Complaint
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Let us know about the issue you're experiencing with public services.
          </p>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">Complaint Submitted Successfully!</h3>
            <p className="mt-2 text-sm text-gray-500">
              Your complaint has been received and will be reviewed soon.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => navigate(`/ticket/${newTicketId}`)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Complaint Details
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go to Dashboard
              </button>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              You will be automatically redirected to complaint details in a few seconds...
            </p>
          </div>
        ) : (
          <TicketForm onSuccess={handleSubmitSuccess} />
        )}
      </div>
    </div>
  );
};

export default SubmitTicket;