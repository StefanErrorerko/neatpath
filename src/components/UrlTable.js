// src/components/UrlTable.js
import '../styles/table.css';

export default function UrlTable({ urls }) {
  return (
    <div className="table-wrapper">
      <div className="table-container">
        <div className="table-scroll">
          <table className="url-table">
            <thead className="table-header">
              <tr>
                <th className="table-heading">
                  ID
                </th>
                <th className="table-heading">
                  Original URL
                </th>
                <th className="table-heading">
                  Shortened URL
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {urls.map((url) => (
                <tr key={url.id} className="table-row">
                  <td className="table-cell id-cell">
                    {url.id}
                  </td>
                  <td className="table-cell">
                    <a href={url.originalUrl} className="url-link original-url">
                      {url.originalUrl}
                    </a>
                  </td>
                  <td className="table-cell">
                    <a href={url.shortUrl} className="url-link">
                      {url.shortUrl}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}