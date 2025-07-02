import React, { useState } from 'react';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Reuse the styling

function Login({ isDarkMode }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('');
  setLoading(true);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';
  try {
    const res = await fetch(`${apiUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.status === 401) {
      setMessage('Invalid email or password. Please try again.');
  } else if (!res.ok) {
    setMessage(data.message || 'Login failed');
  } else {
  setMessage('Login successful! Redirecting...');
  localStorage.setItem('token', data.access_token);

  // Redirect to homepage after a short delay
  setTimeout(() => {
    navigate('/');
  }, 1500);
}
  } catch (err) {
    setMessage('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const themeClass = isDarkMode ? 'bg-dark text-white border-light' : '';

  return (
    <div className={`card p-4 mx-auto mt-5 shadow ${themeClass}`} style={{ maxWidth: 400 }}>
      <h2 className="mb-3 text-center">Login</h2>
      {message && (
        <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            value={formData.email}
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 position-relative">
          <input
            value={formData.password}
            className="form-control pe-5"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <span
            className="position-absolute"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              top: '50%',
              right: '15px',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#6c757d',
            }}
          >
            <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </span>
        </div>

        <div className="mb-3 text-end">
          <a href="/forgot-password" className="text-decoration-none small">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;