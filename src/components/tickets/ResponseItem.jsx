import React from 'react';

const ResponseItem = ({ response }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="border-l-4 border-blue-500 pl-4 py-2 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-blue-800">Administrator Response</span>
        <span className="text-xs text-gray-500">{formatDate(response.responded_at)}</span>
      </div>
      <p className="text-gray-700 text-sm">{response.response_text}</p>
    </div>
  );
};

export default ResponseItem;