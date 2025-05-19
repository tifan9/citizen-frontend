import React, { useState, useContext } from 'react';
import { TicketContext } from '../../context/TicketContext';

const CategoryForm = ({ onSuccess }) => {
  const { addCategory } = useContext(TicketContext);
  
  const [formData, setFormData] = useState({
    categoryName: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.categoryName.trim()) {
      newErrors.categoryName = 'Category name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
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
      
      const newCategory = addCategory(formData);
      
      // Reset form
      setFormData({
        categoryName: '',
        description: ''
      });
      
      if (onSuccess) {
        onSuccess(newCategory);
      }
    } catch (error) {
      console.error('Error submitting category:', error);
      setErrors({ submit: 'Failed to create category. Please try again.' });
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
        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
          Category Name
        </label>
        <input
          id="categoryName"
          name="categoryName"
          type="text"
          value={formData.categoryName}
          onChange={handleChange}
          className={`w-full rounded-md border ${errors.categoryName ? 'border-red-500' : 'border-gray-300'} shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.categoryName && (
          <p className="mt-1 text-sm text-red-600">{errors.categoryName}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className={`w-full rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300'} shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        ></textarea>
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Creating...' : 'Create Category'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;