import React, { useState } from 'react';
import './App.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setStatus({ message: '', type: '' }); // Clear status on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: '', type: '' });

    console.log('Form data:', formData);
    console.log('API URL:', process.env.REACT_APP_API_URL || 'Not defined');

    const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5001';
    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setStatus({ message: data.message, type: 'success' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ message: data.error || 'Kaore i tukuna te puka. Whakamātau anō.', type: 'error' });
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
      setStatus({ message: `Pānga hononga: ${error.message}. Whakamātau anō.`, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Ingoa (Name)</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tō Ingoa"
                  required
                  aria-required="true"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Īmēra (Email)</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Tō Īmēra"
                  required
                  aria-required="true"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Kōrero (Message)</label>
                <textarea
                  className="form-control"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tō Karere"
                  rows="5"
                  required
                  aria-required="true"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Tukuna (Send)
              </button>
            </form>
            {status.message && (
              <p className={`mt-3 text-center text-${status.type === 'error' ? 'danger' : 'success'}`}>
                {status.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;