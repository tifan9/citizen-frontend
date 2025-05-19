import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { TicketContext } from '../../context/TicketContext';

const TicketForm = ({ onSuccess }) => {
  const { user } = useContext(UserContext);
  const { categories, addTicket } = useContext(TicketContext);
  
  const [formData, setFormData] = useState({
    category_id: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.category_id) {
      newErrors.category_id = 'Please select a category';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your complaint or feedback';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Your message is too short. Please provide more details';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTicket = addTicket(formData);
      
      // Reset form
      setFormData({
        category_id: '',
        message: ''
      });
      
      if (onSuccess) {
        onSuccess(newTicket);
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
      setErrors({ submit: 'Failed to submit your ticket. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {errors.submit}
        </div>
      )}
      
      <div>
        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category_id"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className={`w-full rounded-md border ${errors.category_id ? 'border-red-500' : 'border-gray-300'} shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        >
          <option value="" disabled>Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Your complaint or feedback
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          placeholder="Please provide detailed information about your issue..."
          className={`w-full rounded-md border ${errors.message ? 'border-red-500' : 'border-gray-300'} shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </div>
    </form>
  );
};

export default TicketForm;