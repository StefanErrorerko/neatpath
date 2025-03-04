import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import UrlDetails from './pages/UrlDetails';
import Register from './pages/Register';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  return children;
}

function AdminRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const userRole = localStorage.getItem('userRole');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  if (userRole !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path='/register' element={<Register />} />
      
      <Route 
        path="/url/:hash" 
        element={
          <ProtectedRoute>
            <UrlDetails />
          </ProtectedRoute>
        } 
      />

      {/* Handling not found page */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">404</h1>
            <p className="mt-2 text-gray-600">Page not found</p>
          </div>
        </div>
      } />
    </Routes>
  );
}



export default App;