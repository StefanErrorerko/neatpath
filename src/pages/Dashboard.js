import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UrlTable from "../components/UrlTable";

export default function Dashboard() {
    const [urls, setUrls] = useState([]);
    const userRole = localStorage.getItem('userRole');
  
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Your URLs</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add New URL
            </button>
          </div>
          <UrlTable urls={urls} isAdmin={userRole === 'admin'} />
        </main>
        <Footer />
      </div>
    );
  }