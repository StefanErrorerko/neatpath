import React, { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../styles/url-shortener-section.css';

const UrlShortenerSection = ({ isAuthenticated, onUrlShortened, urls, setUrls }) => {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shortenedData, setShortenedData] = useState(null);
  const [isRotated, setIsRotated] = useState(false);
  
  const apiUrl = process.env.REACT_APP_API_URL + 'Url';
  const headers = {
    'Content-Type': 'application/json'
  }

  const validateUrl = (value) => {
    try {
      new URL(value);
      setUrlError('');
      return true;
    } catch {
      setUrlError('Please enter a valid URL');
      return false;
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    if (e.target.value) validateUrl(e.target.value);
  };

  const handleShorten = async () => {
    if (!validateUrl(url)) return;
    
    setIsProcessing(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('sessionToken');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          originalUrl: url,
          userId: user?.id
        })
      });

      if (!response.ok && response.status === 409) 
        throw new Error('This Url has already been processed.');
      
      const data = await response.json();
      setShortenedData(data);
      setIsRotated(true);
      
      if (Array.isArray(urls)) {
        setUrls([data, ...urls]);
      }
    } catch (error) {
      setUrlError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="url-shortener">
        <h2 className="section-title">
          Make your URL short and neat
        </h2>
        <p className="hero-text">
          Login to try our possibilities and short your URL
        </p>
      </div>
    );
  }

  return (
    <div className="url-shortener">
      <h2 className="section-title">
        Make your URL short and neat
      </h2>
      
      <div className="url-input-container">
        <label className="input-label">Insert your URL</label>
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://example.com/very-long-url"
            className={`url-input ${isProcessing ? 'loading' : ''} ${urlError ? 'error' : ''}`}
          />
          {urlError && (
            <p className="error-message">{urlError}</p>
          )}
          <button
            onClick={handleShorten}
            disabled={!url || isProcessing}
            className="shorten-button"
          >
            <ArrowForwardIcon 
              className={isRotated ? 'rotate-90' : ''}
              size={20}
            />
          </button>
        </div>
      </div>

      <div className={`result-container ${!shortenedData ? 'fade-enter' : 'fade-enter-active'}`}>
        {shortenedData && (
          <>
            <label className="input-label">Your short URL</label>
            <div className="result-info">
              <p className="shortened-url">
                {shortenedData.shortUrl}
              </p>
              <div className="url-details">
                <p>Hash: {shortenedData.hash}</p>
                <p>Created by: {shortenedData.user?.username || 'Anonymous'}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UrlShortenerSection;