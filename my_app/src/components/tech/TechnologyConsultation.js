import React from 'react';
import translations from '../translations';
import './tech.css';

function TechnologyConsultation({ selectedLanguage }) {
  const t = translations[selectedLanguage]?.techConsultationPage || translations.en.techConsultationPage;

  return (
    <div className="tech-consultation-page">
      <header className="hero-section py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">{t.title}</h1>
          <p className="lead">{t.subtitle}</p>
        </div>
      </header>

      <main className="container py-5">
        <section className="services-section mb-5">
          <h2 className="h3 text-center mb-4">{t.servicesTitle}</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {t.servicesList.map((item, index) => (
            <li key={index} className="mb-2"> {item}</li>
          ))}
          </div>
        </section>


      <section className=" py-4">
        <div className="container">
          <h2 className="mb-3">{t.whyTitle}</h2>
          <p>{t.whyText}</p>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="mb-3">{t.howTitle}</h2>
        <ul className="list-unstyled">
          {t.steps.map((step, index) => (
            <li key={index} className="mb-2">{step}</li>
          ))}
        </ul>
      </section>

      <section className="py-5 text-center">
        <div className="container">
          <h2>{t.readyTitle}</h2>
          <p>{t.readyText}</p>
          <a href="/advisors/4" className="btn btn-primary mt-3">Book Now</a>
        </div>
      </section>

      <section className="container my-5 text-center">
        <h2 className="mb-4">{t.testimonialTitle}</h2>
        <blockquote className="blockquote">
          <p className="mb-0">“{t.testimonialQuote}”</p>
          <footer className="blockquote-footer mt-2">{t.testimonialAuthor}</footer>
        </blockquote>
      </section>
      </main>
    </div>
  );
}

export default TechnologyConsultation;
