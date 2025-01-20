import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../styles/urldetails.css';
import '../styles/index.css'
import BackgroundDecorations from "../components/BackgroundDecorations";

export default function UrlDetails() {
  const {hash} = useParams();
  const [urlDetails, setUrlDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!localStorage.getItem('sessionToken');

  const apiUrl = process.env.REACT_APP_API_URL

  useEffect(() => {
    fetchUrlDetails();
  }, [hash]);

  const fetchUrlDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(apiUrl + `Url/hash/${hash}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`URL not found (${response.status})`);
      }

      const data = await response.json();
      console.log(data)
      setUrlDetails(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching URL details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="error-container">
          <p className="error-message">Error: {error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!urlDetails) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="error-container">
          <p className="error-message">URL not found</p>
        </div>
        <Footer />
      </div>
    );
  }

// Add the delete handler function
const handleDelete = async () => {
  try {
    const token = localStorage.getItem('sessionToken');
    const response = await fetch(apiUrl + `Url/${urlDetails.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete URL (${response.status})`);
    }

    navigate('/');
  } catch (error) {
    console.error('Error deleting URL:', error);
    setError('Failed to delete URL: ' + error.message);
  }
};

  return (
    <div className="page-container">
      <BackgroundDecorations />
      <Navbar />
      <main className="main-content">
        <div className="details-card">
          <h1 className="details-title">URL Details</h1>
          
          <div className="details-grid">
            <div className="detail-item">
              <h2 className="detail-label">Original URL</h2>
              <a href={urlDetails.originalUrl} className="detail-value url-link">
                {urlDetails.originalUrl}
              </a>
            </div>
            
            <div className="detail-item">
              <h2 className="detail-label">Shortened URL</h2>
              <a href={urlDetails.shortUrl} className="detail-value url-link">
                {urlDetails.shortUrl}
              </a>
            </div>
            
            <div className="detail-item">
              <h2 className="detail-label">Hash</h2>
              <p className="detail-value">{urlDetails.hash}</p>
            </div>

            <div className="detail-item">
              <h2 className="detail-label">Created By</h2>
              <p className="detail-value creator-email">{urlDetails.user?.username || 'Anonymous'}</p>
            </div>

            <div className="detail-item">
              <h2 className="detail-label">Created</h2>
              <p className="detail-value">{new Date(urlDetails.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="detail-item">
              <h2 className="detail-label">Click Count</h2>
              <p className="detail-value">{urlDetails.clickCount}</p>
            </div>
          </div>

          <div className="action-buttons">
            {isLoggedIn && user && urlDetails.user && user.id === urlDetails.user.id && (
              <button 
                className="transparent-delete-button"
                onClick={handleDelete}
              >
                Remove
              </button>
            )}
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}