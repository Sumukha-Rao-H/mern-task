import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 8 }}>Login</Link>
        <Link to="/signup" style={{ marginRight: 8 }}>Signup</Link>
        <Link to="/home">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}
