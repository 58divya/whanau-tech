import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/contact`, formData);
      setStatus({ message: response.data.message, type: 'success' });
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      setStatus({
        message: error.response?.data?.error || 'I hē te tukunga. Whakamātau anō.',
        type: 'error'
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div>
          <label htmlFor="name">Name:</label><br />
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label><br />
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label><br />
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={{ width: '100%' }}
          />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Send</button>
      </form>

      {status.message && (
        <p style={{ color: status.type === 'error' ? 'red' : 'green', marginTop: '10px' }}>
          {status.message}
        </p>
      )}
    </div>
  );
}

export default ContactForm;