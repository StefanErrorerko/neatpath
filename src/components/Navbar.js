import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import '../styles/navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;

      setIsScrolled(true);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('sessionToken');
    setIsAuthenticated(!!token);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('sessionToken');
      const response = await fetch(apiUrl + 'Auth/logout', {
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

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>      
      <div className="navbar-container">
        <div className="logo-container">
          <button onClick={handleHomeClick} className="logo-button">
            <span className="logo-symbol">NeatPath</span>
          </button>
        </div>
        
        <div className="nav-links">
          <span 
            className="about-text-link"
            onClick={handleAboutClick}
          >
            About
          </span>
          {isAuthenticated ? (
            <button 
              className="auth-button"
              onClick={handleLogout}
              title="Logout"
            >
              <LogoutIcon size={20} />
            </button>
          ) : (
            <button 
              className="auth-button"
              onClick={handleLoginClick}
              title="Login"
            >
              <PersonOutlineIcon size={20} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}