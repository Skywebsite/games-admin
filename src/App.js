import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Play from './pages/Play';
import Room from './pages/Room';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="min-h-screen bg-dark-bg text-dark-text font-sans">
            <Navbar />
            <Routes>
              <Route path="/" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<div className="text-white text-center mt-10">404 - Not Found</div>} />
            </Routes>
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
