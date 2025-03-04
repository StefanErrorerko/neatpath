import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/login.css';
import '../styles/index.css';
import BackgroundDecorations from '../components/BackgroundDecorations';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setLoginData({
      username: '',
      password: ''
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(apiUrl + 'Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password
        })
      });

      if (response.status === 401) {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid username or password');
        resetForm();
        return;
      }

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      localStorage.setItem('sessionToken', data.token);
      localStorage.setItem('sessionExpires', data.expiresAt);
      localStorage.setItem('user', JSON.stringify(data.user));

      document.cookie = `sessionToken=${data.token}; expires=${new Date(data.expiresAt).toUTCString()}; path=/`;
      navigate('/');
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="page-container">
      <BackgroundDecorations />
      <Navbar />
      <div className='login-container'>
        <main className="login-main">
          <div className="login-form-container">
            <h1 className="login-title">Login Details</h1>
            <p className="login-subtitle">Enter your login and password</p>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Login:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={loginData.username}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Pass:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <button type="submit" className="login-button">
                Login
              </button>
            </form>

            <div className="register-prompt">
              <Link to="/register" className="register-link">
                Not registered yet? Sign up!
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;