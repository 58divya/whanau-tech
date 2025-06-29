import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Add registration logic here
    alert('Account created!');
    navigate('/login');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Sign Up</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-success w-100" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;