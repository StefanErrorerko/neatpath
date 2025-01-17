import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UrlDetails() {
    const { urlId } = useParams();
    const [urlDetails, setUrlDetails] = useState(null);
    const userRole = localStorage.getItem('userRole');
  
    useEffect(() => {
      // Fetch URL details from API
      const fetchUrlDetails = async () => {
        try {
          const response = await fetch(`/api/urls/${urlId}`);
          const data = await response.json();
          setUrlDetails(data);
        } catch (error) {
          console.error('Error fetching URL details:', error);
        }
      };
  
      fetchUrlDetails();
    }, [urlId]);
  
    if (!urlDetails) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">URL Details</h1>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Original URL</h2>
                <p className="mt-1">{urlDetails.originalUrl}</p>
              </div>
              
              <div>
                <h2 className="text-sm font-medium text-gray-500">Shortened URL</h2>
                <p className="mt-1">{urlDetails.shortUrl}</p>
              </div>
              
              <div>
                <h2 className="text-sm font-medium text-gray-500">Created At</h2>
                <p className="mt-1">{new Date(urlDetails.createdAt).toLocaleDateString()}</p>
              </div>
              
              <div>
                <h2 className="text-sm font-medium text-gray-500">Click Count</h2>
                <p className="mt-1">{urlDetails.clickCount}</p>
              </div>
            </div>
  
            {/* Admin/Owner Controls */}
            {(userRole === 'admin' || urlDetails.userId === localStorage.getItem('userId')) && (
              <div className="mt-6 space-x-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Delete URL
                </button>
                {userRole === 'admin' && (
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Edit URL
                  </button>
                )}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }