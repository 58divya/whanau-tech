import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // In real app, send reset email here
    alert(`Reset link sent to ${email}`);
    setSubmitted(true);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Forgot Password</h3>
          {submitted ? (
            <div className="alert alert-success text-center">
              If the email exists, a reset link has been sent.
            </div>
          ) : (
            <form onSubmit={handleForgotPassword}>
              <div className="mb-3">
                <label className="form-label">Enter your email address</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="btn btn-primary w-100" type="submit">Send Reset Link</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;