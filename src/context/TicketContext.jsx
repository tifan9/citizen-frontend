import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

export const TicketContext = createContext();

// Mock data for categories
const mockCategories = [
  { id: 1, name: 'Roads & Infrastructure', description: 'Issues related to roads, bridges, and public infrastructure' },
  { id: 2, name: 'Water Supply', description: 'Issues related to water supply, quality, and distribution' },
  { id: 3, name: 'Waste Management', description: 'Issues related to garbage collection, disposal, and recycling' },
  { id: 4, name: 'Public Transportation', description: 'Issues related to buses, trains, and other public transport' },
  { id: 5, name: 'Electricity', description: 'Issues related to power supply and electrical infrastructure' },
  { id: 6, name: 'Public Safety', description: 'Issues related to crime, safety concerns, and emergency services' },
  { id: 7, name: 'Parks & Recreation', description: 'Issues related to public parks, playgrounds, and recreational areas' },
  { id: 8, name: 'Other', description: 'Other issues not covered by the above categories' }
];

// Generate mock UUID
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const TicketProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState(mockCategories);
  
  useEffect(() => {
    // Load tickets from localStorage
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, []);

  // Save tickets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = (ticketData) => {
    const newTicket = {
      id: generateUUID(),
      user_id: user?.id || 'anonymous',
      category_id: ticketData.category_id,
      message: ticketData.message,
      status: 'open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      responses: []
    };
    
    setTickets([...tickets, newTicket]);
    return newTicket;
  };

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            status: newStatus, 
            updated_at: new Date().toISOString() 
          } 
        : ticket
    ));
  };

  const addResponse = (ticketId, responseData) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        const newResponse = {
          id: Date.now(),
          ticket_id: ticketId,
          admin_id: responseData.admin_id,
          response_text: responseData.response_text,
          responded_at: new Date().toISOString()
        };
        
        return {
          ...ticket,
          responses: [...(ticket.responses || []), newResponse],
          updated_at: new Date().toISOString()
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
  };

  const getUserTickets = (userId) => {
    return tickets.filter(ticket => ticket.user_id === userId);
  };

  const getTicketById = (ticketId) => {
    return tickets.find(ticket => ticket.id === ticketId);
  };

  const getCategoryById = (categoryId) => {
    return categories.find(category => category.id === categoryId);
  };

  const value = {
    tickets,
    categories,
    addTicket,
    updateTicketStatus,
    addResponse,
    getUserTickets,
    getTicketById,
    getCategoryById
  };

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};