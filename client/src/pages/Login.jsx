import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

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
      localStorage.setItem('token', res.data.token);
      nav('/home');
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-mid">
      <div className="bg-dark rounded-2xl p-8 shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-light">Welcome Back</h2>

        {msg && <p className="text-red-400 mb-4 text-center">{msg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-light/80">Username</label>
            <input
              className="w-full p-2 rounded-md bg-mid text-light focus:outline-none focus:ring-2 focus:ring-accent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-light/80">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded-md bg-mid text-light focus:outline-none focus:ring-2 focus:ring-accent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-dark font-semibold py-2 rounded-md hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-light/70">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
