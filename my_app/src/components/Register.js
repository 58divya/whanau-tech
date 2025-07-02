import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { ClipLoader } from "react-spinners";
import './Register.css';
import { useNavigate } from 'react-router-dom';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

function Register({ isDarkMode }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (val) => val !== '' && val !== null && val !== undefined
    );
    const passwordsMatch = formData.password === formData.confirmPassword;
    const emailValid = isValidEmail(formData.email);
    const passwordStrong = isStrongPassword(formData.password);

    setCanSubmit(allFieldsFilled && passwordsMatch && emailValid && passwordStrong);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!canSubmit) {
      setMessage('Please check your inputs.');
      return;
    }

    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

    try {
      const res = await fetch(`${apiUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          dob: formData.dob,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const themeClass = isDarkMode ? 'bg-dark text-white border-light' : '';

  return (
    <div className={`card p-4 mx-auto mt-4 shadow ${themeClass}`} style={{ maxWidth: 450 }}>
      <h2 className="mb-3 text-center">Sign Up</h2>

      {message && (
        <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <input
          className="form-control mb-2"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />

        <label className="form-label">Date of Birth</label>
        <input
          className="form-control mb-2"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="mb-2 position-relative">
          <input
            className="form-control pe-5"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            className="position-absolute"
            style={{ top: '50%', right: '15px', transform: 'translateY(-50%)', cursor: 'pointer', color: '#6c757d' }}
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </span>
        </div>

        <div className="mb-2 position-relative">
          <input
            className="form-control pe-5"
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span
            className="position-absolute"
            style={{ top: '50%', right: '15px', transform: 'translateY(-50%)', cursor: 'pointer', color: '#6c757d' }}
            onClick={() => setShowConfirm(!showConfirm)}
          >
            <i className={`fa ${showConfirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </span>
        </div>

        <PhoneInput
          international
          defaultCountry="NZ"
          value={formData.phone || ''}
          onChange={handlePhoneChange}
          className="form-control mb-3"
          required
        />

        <div className="text-end mb-2">
          <a href="/forgot-password" className={`small ${isDarkMode ? 'text-light' : 'text-muted'}`}>
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading || !canSubmit}>
          {loading ? <ClipLoader size={20} color="#fff" /> : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;