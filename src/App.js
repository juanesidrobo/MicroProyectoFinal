
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminCreateUser from './components/Admin';
import AdminEditUser from './components/editarUsuario';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {

  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminCreateUser />} />
          <Route path="/editarUsuario" element={<AdminEditUser />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer /> {/* Componente de pie de página fijo */}
    </Router>
    </AuthProvider>
  );
}

export default App;