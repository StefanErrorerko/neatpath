// src/components/Navbar.js
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function UserIcon() {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width="20" 
      height="20" 
      stroke="currentColor" 
      fill="none" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <div className="logo-circle">
              <span className="logo-symbol">NP</span>
            </div>
            <span className="logo-text">NeatPath</span>
          </Link>
        </div>
        
        <div className="nav-links">
          <Link 
            to="/about" 
            className="about-link"
          >
            About
          </Link>
          <Link 
            to="/login" 
            className="user-button"
          >
            <UserIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
}