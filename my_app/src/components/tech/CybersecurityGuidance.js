import React from 'react';
import { Link } from 'react-router-dom';
import './tech.css';

const CybersecurityGuidance = () => {
  return (
    <div className="tech-consultation-page min-vh-100 bg-light">
      <header className="hero-section py-5 bg-primary text-white text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeIn">
            Cybersecurity Guidance / Arataki Haumarutanga Ipurangi
          </h1>
          <p className="lead mb-4">
            Protecting Māori businesses and whānau with expert cybersecurity advice to safeguard your digital assets. <br />
            He tiaki i ngā pakihi Māori me te whānau me ngā tohutohu haumarutanga ipurangi hei tiaki i ō rawa matihiko.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
            aria-label="Contact our cybersecurity team"
          >
            Contact Our Cyber Team / Whakapā Mai ki Tō Mātou Rōpū Haumarutanga
          </Link>
        </div>
      </header>

      <main className="container py-5">
        <section className="services-section mb-5">
          <h2 className="h3 text-center mb-4">Our Cybersecurity Services / Ā Mātou Ratonga Haumarutanga</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {[
              { icon: '🛡️', text: 'Threat assessments and audits / Aromatawai whakatumatuma me ngā arotake' },
              { icon: '🔒', text: 'Secure system configurations / Whirihoranga pūnaha haumaru' },
              { icon: '📡', text: 'Network security and monitoring / Haumarutanga whatunga me te aroturuki' },
              { icon: '🧑‍🏫', text: 'Cybersecurity training for whānau / Whakangungu haumarutanga ipurangi mō te whānau' },
              { icon: '🔍', text: 'Incident response and recovery plans / Whakautu āhuatanga me ngā mahere whakaora' },
            ].map((service, index) => (
              <div key={index} className="col">
                <div className="card h-100 shadow-sm animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="card-body d-flex align-items-start">
                    <span className="fs-3 me-3">{service.icon}</span>
                    <p className="card-text">{service.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="why-section mb-5 bg-white p-4 rounded shadow">
          <h2 className="h3 text-center mb-4">Why This Matters / He Aha Tēnei e Hirahira Ai</h2>
          <p className="fs-5 text-muted">
            At WhānauTech, we prioritize the digital safety of tangata whenua, offering cybersecurity guidance rooted in tikanga Māori to protect your data and taonga while fostering trust and resilience. <br />
            I WhānauTech, ka whakanui mātou i te haumarutanga matihiko o te tangata whenua, me ngā arataki haumarutanga e pūtake ana ki te tikanga Māori hei tiaki i ō raraunga me ō taonga, me te whakapakari i te whakawhirinaki me te pakari.
          </p>
        </section>

        <section className="how-section mb-5">
          <h2 className="h3 text-center mb-4">How It Works / Me Pēhea te Mahi</h2>
          <ol className="list-group list-group-numbered">
            {[
              '📞 Book a free initial kōrero / Tono he kōrero tuatahi kore utu',
              '📝 Share your cybersecurity concerns or goals / Tohaina ō māharahara haumarutanga, whāinga rānei',
              '🎯 Receive a tailored cybersecurity plan / Ka whiwhi koe i tētahi mahere haumarutanga kua whakaritea',
            ].map((step, index) => (
              <li key={index} className="list-group-item d-flex align-items-start">
                <span className="fs-3 me-3">{step.split(' ')[0]}</span>
                <span>{step.slice(2)}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="cta-section mb-5 text-center bg-primary text-white p-4 rounded">
          <h2 className="h3 mb-4">Ready to Get Started? / Kua Reri Koe?</h2>
          <p className="fs-5 mb-4">
            Contact our cybersecurity team to secure your digital assets and start your journey to a safer online presence. <br />
            Whakapā mai ki tō mātou rōpū haumarutanga ki te tiaki i ō rawa matihiko me te tīmata i tō haerenga ki te ao ipurangi haumaru.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
            aria-label="Contact our cybersecurity team"
          >
            Contact Our Cyber Team / Whakapā Mai ki Tō Mātou Rōpū Haumarutanga
          </Link>
        </section>

        <section className="testimonial-section">
          <h2 className="h3 text-center mb-4">What Our Whānau Say / Ngā Kōrero a te Iwi</h2>
          <div id="cybersecurityCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {[
                {
                  quote: "WhānauTech’s cybersecurity audit protected our business from threats. Ka rawe!",
                  author: "Tia, Gisborne",
                },
                {
                  quote: "Their training empowered our team to stay safe online. Highly recommend!",
                  author: "Rawiri, Nelson",
                },
                {
                  quote: "Thanks to WhānauTech, we have a robust plan to recover from cyber incidents!",
                  author: "Kahu, Rotorua",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                >
                  <blockquote className="bg-white p-4 rounded shadow text-center">
                    <p className="fs-5 fst-italic text-muted">
                      "{testimonial.quote}" <br />
                      – {testimonial.author}
                    </p>
                  </blockquote>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#cybersecurityCarousel"
              data-bs-slide="prev"
              aria-label="Previous testimonial"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#cybersecurityCarousel"
              data-bs-slide="next"
              aria-label="Next testimonial"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
            <div className="carousel-indicators">
              {Array(3)
                .fill()
                .map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#cybersecurityCarousel"
                    data-bs-slide-to={index}
                    className={index === 0 ? 'active' : ''}
                    aria-current={index === 0 ? 'true' : 'false'}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CybersecurityGuidance;