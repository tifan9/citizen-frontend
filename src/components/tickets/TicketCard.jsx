import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import { TicketContext } from '../../context/TicketContext';

const TicketCard = ({ ticket }) => {
  const { getCategoryById } = useContext(TicketContext);
  const category = getCategoryById(ticket.category_id);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Link
      to={`/ticket/${ticket.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
              {category?.name || 'Unknown Category'}
            </h3>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              <span>Submitted {formatDate(ticket.created_at)}</span>
            </div>
          </div>
          <StatusBadge status={ticket.status} />
        </div>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {ticket.message}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs text-gray-500">
            {ticket.responses?.length 
              ? `${ticket.responses.length} response${ticket.responses.length !== 1 ? 's' : ''}`
              : 'No responses yet'}
          </div>
          <div className="text-blue-600 flex items-center text-sm font-medium">
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TicketCard;