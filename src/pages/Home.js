import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import UrlTable from '../components/UrlTable';
import UrlShortenerSection from '../components/UrlShortenerSection';
import Footer from '../components/Footer';
import '../styles/home.css';
import '../styles/index.css';

export default function Home() {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL

  useEffect(() => {
    checkAuth();
    fetchUrls();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('sessionToken');
    setIsAuthenticated(!!token);
  };

  const fetchUrls = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(apiUrl + 'Url', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUrls(data);
    } catch (err) {
      setError('Failed to fetch URLs: ' + err.message);
      console.error('Error fetching URLs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <main className="main-container">
        <div className="hero-section">
          <h1 className="hero-title">
            Hi there!
          </h1>
          <p className="hero-text">
            Welcome to NeatPath - where long URLs become short and sweet. 
          </p>
        </div>

        <UrlShortenerSection 
          isAuthenticated={isAuthenticated}
          onUrlShortened={fetchUrls}
          urls={urls}
          setUrls={setUrls}
        />

        <div className="mt-8">
          <h2 className="hero-title">
            Recently Shortened URLs
          </h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <UrlTable urls={urls} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}