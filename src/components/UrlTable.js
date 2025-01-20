// src/components/UrlTable.js
import { useNavigate } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import '../styles/table.css';

export default function UrlTable({ urls }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!localStorage.getItem('sessionToken');

  const extractHash = (shortUrl) => {
    return shortUrl.split('/').pop();
  };

  const handleCellClick = (shortUrl, e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'svg' || e.target.tagName === 'path') {
      return;
    }
    const hash = extractHash(shortUrl);
    navigate(`/url/${hash}`);
  };

  const handleRemove = async (e, urlId) => {
    e.stopPropagation();
    
    try {
      const token = localStorage.getItem('sessionToken');
      const response = await fetch(`https://localhost:7251/api/v1/Url/${urlId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete URL (${response.status})`);
      }
  
      // You might want to refresh the URLs list after successful deletion
      // This depends on how you manage your state
      window.location.reload();
    } catch (error) {
      console.error('Error deleting URL:', error);
      alert('Failed to delete URL: ' + error.message);
    }
  };

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <div className="table-scroll">
          <table className="url-table">
            <thead className="table-header">
              <tr>
                <th className="table-heading">ID</th>
                <th className="table-heading">Original URL</th>
                <th className="table-heading">Shortened URL</th>
                {isLoggedIn && <th className="table-heading"></th>}
              </tr>
            </thead>
            <tbody className="table-body">
              {urls.map((url) => (
                <tr
                  key={url.id}
                  className="table-row"
                  onClick={(e) => handleCellClick(url.shortUrl, e)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className="table-cell id-cell">{url.id}</td>
                  <td className="table-cell">
                    <a
                      href={url.originalUrl}
                      className="url-link original-url"
                      onClick={e => e.stopPropagation()}
                    >
                      {url.originalUrl}
                    </a>
                  </td>
                  <td className="table-cell">
                    <a
                      href={url.shortUrl}
                      className="url-link"
                      onClick={e => e.stopPropagation()}
                    >
                      {url.shortUrl}
                    </a>
                  </td>
                  {isLoggedIn && (
                    <td className="table-cell action-cell">
                      {user && url.user && (url.user.id === user.id || user.role === "Admin") && (
                        <button
                          className="remove-button"
                          onClick={(e) => handleRemove(e, url.id)}
                          title="Remove URL"
                        >
                          <RemoveIcon />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}