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
      const response = await axios.post('http://localhost:5000/api/contact', formData);
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
    <form onSubmit={handleSubmit}>
      {/* Input fields for name, email, and message */}
      {/* Display status message if present */}
    </form>
  );
}