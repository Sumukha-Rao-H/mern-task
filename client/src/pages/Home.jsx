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
        console.error(err);
        // logout and redirect to login
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

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>Protected Home</h2>
      <p>Welcome, <strong>{user.username}</strong></p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
