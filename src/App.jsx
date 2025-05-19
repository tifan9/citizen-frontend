import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import SubmitTicket from './pages/SubmitTicket';
import TicketDetails from './pages/TicketDetails';
import NotFound from './pages/NotFound';
import { UserProvider } from './context/UserContext';
import { TicketProvider } from './context/TicketContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <TicketProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/submit" element={<SubmitTicket />} />
                <Route path="/ticket/:id" element={<TicketDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </TicketProvider>
      </UserProvider>
    </Router>
  );
}

export default App;