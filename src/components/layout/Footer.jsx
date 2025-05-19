import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">InziraYacu</h3>
            <p className="text-blue-100 text-sm">
              Connecting citizens with government services to improve community engagement and responsiveness.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/submit" className="hover:text-white">Submit Ticket</Link></li>
              <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li>Email: support@InziraYacu.gov</li>
              <li>Phone: (555) 123-4567</li>
              <li>Hours: Mon-Fri 9am-5pm</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-blue-200">
            © {currentYear} InziraYacu. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-blue-200 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-blue-200 hover:text-white">Terms of Service</Link>
            <Link to="/accessibility" className="text-sm text-blue-200 hover:text-white">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;