import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/auth');
        setUser(res.data.user);
      } catch (err) {
        localStorage.removeItem('token');
        nav('/');
      }
    };
    fetchUser();
  }, [nav]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    nav('/');
  };

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen text-light">
        Loading dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-dark text-light flex">
      {/* Sidebar */}
      <aside className="w-64 bg-mid p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8 text-accent">MERN Dashboard</h1>
          <nav className="space-y-4">
            <button className="w-full text-left hover:text-accent transition">🏠 Overview</button>
            <button className="w-full text-left hover:text-accent transition">👤 Profile</button>
            <button className="w-full text-left hover:text-accent transition">⚙️ Settings</button>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="bg-accent text-dark py-2 rounded-md font-semibold hover:opacity-90 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-4">Welcome, {user.username}</h2>
        <p className="text-light/70 mb-6">
          You are securely logged in using JWT authentication.
        </p>

        {/* Dashboard widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-mid rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-accent">User Info</h3>
            <p>ID: {user._id}</p>
            <p>Username: {user.username}</p>
          </div>

          <div className="bg-mid rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-accent">Status</h3>
            <p>JWT Valid: ✅</p>
            <p>Session: Active</p>
          </div>

          <div className="bg-mid rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-accent">Server</h3>
            <p>Connected to backend API</p>
            <p>Database: MongoDB</p>
          </div>
        </div>
      </main>
    </div>
  );
}
