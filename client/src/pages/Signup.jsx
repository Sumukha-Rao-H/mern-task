import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await API.post('/signup', { username, password });
      setMsg({ type: 'success', text: res.data.message || 'Registered' });
      setTimeout(() => nav('/'), 800);
    } catch (err) {
      setMsg({ type: 'error', text: err?.response?.data?.message || 'Signup failed' });
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Sign Up</h2>
      {msg && <div style={{ color: msg.type === 'error' ? 'red' : 'green' }}>{msg.text}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Username</label><br/>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
