import React, { useState } from 'react';
import translations from './translations';

function ContactForm({ selectedLanguage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = translations[selectedLanguage].contact;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setStatus({ message: '', type: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: '', type: '' });

    const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';
    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ message: data.message, type: 'success' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ message: data.error || 'Kaore i tukuna te puka. Whakamātau anō.', type: 'error' });
      }
    } catch (error) {
      setStatus({ message: `Pānga hononga: ${error.message}. Whakamātau anō.`, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section id="contact" className="py-5" style={{ backgroundColor: '#e6f2ff' }}>
        <div className="absolute top-0 w-full h-24 overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path fill="#e6f2ff" fillOpacity="1" d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </div>
        <div className="container">
          <h2 className="text-center mb-5" style={{color: '#004466'}}>{t.title}</h2>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">{t.form.nameLabel}</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.form.namePlaceholder}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">{t.form.emailLabel}</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.form.emailPlaceholder}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label">{t.form.subjectLabel}</label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={t.form.subjectPlaceholder}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">{t.form.messageLabel}</label>
                      <textarea
                        className="form-control"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t.form.messagePlaceholder}
                        rows="5"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                      {isSubmitting
                        ? (selectedLanguage === 'mi' ? 'Tuku ana...' : 'Sending...')
                        : (selectedLanguage === 'mi' ? 'Tukua' : 'Send')}
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
        </div>
        <div className="absolute bottom-0 w-full h-24 overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
      </section>
    </div>
  );
}

export default ContactForm;
