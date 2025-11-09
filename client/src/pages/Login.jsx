import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await API.post('/login', { username, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setMsg({ type: 'success', text: 'Logged in' });
      nav('/home');
    } catch (err) {
      setMsg({ type: 'error', text: err?.response?.data?.message || 'Login failed' });
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
