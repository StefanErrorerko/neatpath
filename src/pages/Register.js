import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/register.css';

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL

  const validatePassword = (password) => {
    const minLength = password.length >= 6 && password.length <= 50;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    if (!minLength) {
      return 'Password must be between 6 and 50 characters';
    }
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      return 'Password must contain uppercase, lowercase letters and numbers';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      const passwordError = validatePassword(value);
      setError(passwordError);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const passwordError = validatePassword(registerData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const response = await fetch(apiUrl + 'Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerData.username,
          password: registerData.password,
          role: "Authorized"
        })
      });

      if (response.status === 409) {
        setError('Username already exists');
        return;
      }

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();

      // Store session data
      localStorage.setItem('sessionToken', data.token);
      localStorage.setItem('sessionExpires', data.expiresAt);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Set session cookie
      document.cookie = `sessionToken=${data.token}; expires=${new Date(data.expiresAt).toUTCString()}; path=/`;

      // Redirect to home
      navigate('/');
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="register-container">
        <main className="register-main">
          <div className="register-form-container">
            <h1 className="register-title">Create Account</h1>
            <p className="register-subtitle">Enter your details to register</p>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={registerData.username}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
                <small className="password-requirements">
                  Password must be 6-50 characters long and contain uppercase, lowercase letters and numbers
                </small>
              </div>
              
              <button 
                type="submit" 
                className="register-button"
                disabled={!!error}
              >
                Register
              </button>
            </form>

            <div className="login-prompt">
              <Link to="/login" className="login-link">
                Already have an account? Login here
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Register;