import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { TicketContext } from '../context/TicketContext';
import StatusBadge from '../components/ui/StatusBadge';
import ResponseItem from '../components/tickets/ResponseItem';
import ResponseForm from '../components/tickets/ResponseForm';
import { ArrowLeft, Clock, AlertTriangle } from 'lucide-react';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: userLoading } = useContext(UserContext);
  const { getTicketById, getCategoryById, updateTicketStatus } = useContext(TicketContext);
  
  const [ticket, setTicket] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load ticket data
  useEffect(() => {
    try {
      const ticketData = getTicketById(id);
      
      if (ticketData) {
        setTicket(ticketData);
        setCategory(getCategoryById(ticketData.category_id));
      } else {
        setError('Ticket not found');
      }
    } catch (err) {
      console.error('Error loading ticket:', err);
      setError('An error occurred while loading the ticket');
    } finally {
      setLoading(false);
    }
  }, [id, getTicketById, getCategoryById]);
  
  // Security check - only allow user to view their own tickets, or admin to view any
  useEffect(() => {
    if (!userLoading && !loading && ticket && user) {
      if (user.role !== 'admin' && ticket.user_id !== user.id) {
        navigate('/dashboard');
      }
    }
  }, [user, userLoading, ticket, loading, navigate]);
  
  const handleStatusChange = async (newStatus) => {
    try {
      updateTicketStatus(id, newStatus);
      setTicket(prev => ({
        ...prev,
        status: newStatus,
        updated_at: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error || !ticket) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error || 'Ticket not found'}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-6"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Back
      </button>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        {/* Ticket header */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900 flex items-center">
              {category?.name || 'Unknown Category'}
              <span className="ml-3">
                <StatusBadge status={ticket.status} />
              </span>
            </h1>
            <div className="flex items-center text-sm text-gray-500 mt-2 sm:mt-0">
              <Clock className="h-4 w-4 mr-1" />
              <span>Submitted on {formatDate(ticket.created_at)}</span>
            </div>
          </div>
        </div>
        
        {/* Ticket body */}
        <div className="px-6 py-4">
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{ticket.message}</p>
          </div>
          
          {/* Admin actions */}
          {user && user.role === 'admin' && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Admin Actions</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => handleStatusChange('open')}
                  disabled={ticket.status === 'open'}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    ticket.status === 'open'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }`}
                >
                  Mark as Open
                </button>
                <button
                  onClick={() => handleStatusChange('in_progress')}
                  disabled={ticket.status === 'in_progress'}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    ticket.status === 'in_progress'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  Mark as In Progress
                </button>
                <button
                  onClick={() => handleStatusChange('resolved')}
                  disabled={ticket.status === 'resolved'}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    ticket.status === 'resolved'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  Mark as Resolved
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Responses section */}
      <div className="mt-6 bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Responses</h2>
        </div>
        
        <div className="px-6 py-4">
          {ticket.responses && ticket.responses.length > 0 ? (
            <div className="space-y-4">
              {ticket.responses.map(response => (
                <ResponseItem key={response.id} response={response} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No responses yet.</p>
          )}
          
          {/* Response form for admins */}
          {user && user.role === 'admin' && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Add Response</h3>
              <ResponseForm 
                ticketId={ticket.id} 
                onSuccess={() => {
                  // Refresh the ticket data after adding a response
                  const updated = getTicketById(id);
                  if (updated) {
                    setTicket(updated);
                  }
                }} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;