// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar'; // Import the Navbar component
import setAuthToken from './services/api';
import './index.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Set auth token in API service if token exists
  if (token) {
    setAuthToken(token);
  }

  // Handle logout functionality
  const handleLogout = () => {
    setToken(''); // Clear the token state
    localStorage.removeItem('token'); // Remove token from local storage
  };

  return (
    <Router>
      <div className='my-2'>
        <Navbar token={token} onLogout={handleLogout} /> {/* Use the Navbar component */}
        <Routes>
          <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect any undefined route to login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
