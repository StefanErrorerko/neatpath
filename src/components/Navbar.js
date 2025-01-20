import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import '../styles/navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('sessionToken');
    setIsAuthenticated(!!token);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('sessionToken');
      const response = await fetch('https://localhost:7251/api/v1/Auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token
        })
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear session data
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('sessionExpires');
      localStorage.removeItem('user');
      
      // Clear session cookie
      document.cookie = 'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      window.location.reload();
    } catch (err) {
      setError('Failed to logout: ' + err.message);
      console.error('Logout error:', err);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <div className="logo-circle">
              <span className="logo-symbol">NeatPath</span>
            </div>
          </Link>
        </div>
        
        <div className="nav-links">
          <Link 
            to="/about" 
            className="about-link"
          >
            About
          </Link>
          {isAuthenticated ? (
            <button 
              className="auth-button"
              onClick={handleLogout}
              title="Logout"
            >
              <LogoutIcon />
            </button>
          ) : (
            <button 
              className="auth-button"
              onClick={handleLoginClick}
              title="Login"
            >
              <PersonOutlineIcon />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}