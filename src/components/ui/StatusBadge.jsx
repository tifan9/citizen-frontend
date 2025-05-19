import React from 'react';

const StatusBadge = ({ status }) => {
  let bgColor, textColor, label;

  switch (status) {
    case 'open':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      label = 'Open';
      break;
    case 'in_progress':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      label = 'In Progress';
      break;
    case 'resolved':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      label = 'Resolved';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      label = status;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {label}
    </span>
  );
};

export default StatusBadge;