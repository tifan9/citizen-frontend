import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { TicketContext } from '../../context/TicketContext';

const ResponseForm = ({ ticketId, onSuccess }) => {
  const { user } = useContext(UserContext);
  const { addResponse } = useContext(TicketContext);
  
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!response.trim()) {
      setError('Please enter a response');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      addResponse(ticketId, {
        admin_id: user.id,
        response_text: response
      });
      
      setResponse('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error adding response:', error);
      setError('Failed to add your response. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-1">
          Your Response
        </label>
        <textarea
          id="response"
          rows="3"
          value={response}
          onChange={(e) => {
            setResponse(e.target.value);
            if (error) setError('');
          }}
          className={`w-full rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          placeholder="Type your response here..."
        ></textarea>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending...' : 'Send Response'}
        </button>
      </div>
    </form>
  );
};

export default ResponseForm;