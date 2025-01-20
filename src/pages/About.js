import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/about.css';
import BackgroundDecorations from '../components/BackgroundDecorations';

export default function About() {
  return (
    <div className="page-container">
      <BackgroundDecorations />
      <Navbar />
      
      <main className="main-container">
        <div className="hero-section">
          <h1 className="hero-title">
            How does it work?
          </h1>
          <div className="about-content">
            <p className="about-text">
              We use a sophisticated URL shortening algorithm that 
              combines security with efficiency. The system transforms long URLs into 
              compact, easy-to-share links while ensuring uniqueness and reliability:
            </p>
            
            <div className="algorithm-details">
              <h2 className="section-title">Hashing Algorithm:</h2>
              <ul className="feature-list">
                <li className="feature-item">
                  <span className="feature-highlight">MD5 Cryptographic Hashing:</span>
                  A URL starts processing by creating a unique digital fingerprint of your URL using 
                  the MD5 hashing algorithm, ensuring consistent and secure transformation
                </li>
                <li className="feature-item">
                  <span className="feature-highlight">Efficient Compression:</span>
                  The system intelligently selects 6 bytes from the hash, compressing 
                  the fingerprint while maintaining uniqueness
                </li>
                <li className="feature-item">
                  <span className="feature-highlight">Base62 Encoding:</span>
                  Then it converts the compressed hash into a readable format using numbers (0-9), 
                  lowercase (a-z), and uppercase (A-Z) letters, creating short, user-friendly URLs
                </li>
                <li className="feature-item">
                  <span className="feature-highlight">Deterministic Processing:</span>
                  Finally, algorithm ensures that the same input URL always produces the same 
                  shortened link, preventing duplicates and maintaining consistency
                </li>
              </ul>
            </div>

            <p className="about-text">
              This carefully designed process allows to generate over 56 billion unique 
              combinations (due to Base62 Encoding) while keeping URLs short and memorable. Each shortened link is 
              permanent and backed by verification mechanisms to ensure reliability and 
              quick access to your original URLs.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};