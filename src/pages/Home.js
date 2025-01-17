// src/pages/Home.js
import React from 'react';
import Navbar from '../components/Navbar';
import UrlTable from '../components/UrlTable';
import Footer from '../components/Footer';
import '../styles/home.css';

export default function Home() {
  const recentUrls = [
    {
      id: 1,
      originalUrl: 'https://very-long-url-example.com/with/many/parameters?param1=value1&param2=value2',
      shortUrl: 'https://neatpath.com/abc123'
    },
    {
      id: 2,
      originalUrl: 'https://another-example.com/long/path/to/resource',
      shortUrl: 'https://neatpath.com/xyz789'
    }
  ];

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
            <span className="hero-text">
              Login to start shortening your URLs and make them more shareable.
            </span>
          </p>
        </div>

        <div className="mt-2">
          <h2 className="hero-title">
            Recently Shortened URLs
          </h2>
          <UrlTable urls={recentUrls} />
        </div>
      </main>

      <Footer />
    </div>
  );
}