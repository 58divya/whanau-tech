import React from 'react';
import { Link } from 'react-router-dom';
import './tech.css';

const CloudSolutions = () => {
  return (
    <div className="tech-consultation-page min-vh-100 bg-light">
      <header className="hero-section py-5 bg-primary text-white text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeIn">
            Cloud Solutions / Otinga Kapua
          </h1>
          <p className="lead mb-4">
            Enabling Māori businesses and whānau to work flexibly and securely from anywhere using modern cloud technology. <br />
            He whakaahei i ngā pakihi Māori me te whānau kia mahi ngāwari, haumaru hoki mai i ngā wāhi katoa mā te hangarau kapua hou.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
            aria-label="Contact our cloud solutions team"
          >
            Talk to Our Cloud Team / Kōrero ki Tō Mātou Rōpū Kapua
          </Link>
        </div>
      </header>

      <main className="container py-5">
        <section className="services-section mb-5">
          <h2 className="h3 text-center mb-4">What We Offer / He Aha tā Mātou e Whakarato Ai</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {[
              { icon: '☁️', text: 'Cloud migration and setup / Whakanekehanga kapua me te whakarite' },
              { icon: '📧', text: 'Email and storage solutions (Google Workspace, Microsoft 365) / Otinga īmēra me te rokiroki (Google Workspace, Microsoft 365)' },
              { icon: '🤝', text: 'Remote collaboration tools / Taputapu mahi tahi mamao' },
              { icon: '💾', text: 'Data backup and recovery / Pūrua raraunga me te whakaora' },
              { icon: '🧑‍🏫', text: 'Training and ongoing support / Whakangungu me te tautoko haere tonu' },
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
            At WhānauTech, our cloud solutions provide agility, scalability, and security, empowering Māori enterprises and whānau to thrive in a connected world while respecting tikanga Māori and data sovereignty. <br />
            I WhānauTech, ka whakarato ā mātou otinga kapua i te ngāwari, te tauine, me te haumarutanga, e whakakaha ana i ngā hinonga Māori me te whānau kia angitū i te ao hono, me te whakaute i te tikanga Māori me te mana motuhake raraunga.
          </p>
        </section>

        <section className="how-section mb-5">
          <h2 className="h3 text-center mb-4">How It Works / Me Pēhea te Mahi</h2>
          <ol className="list-group list-group-numbered">
            {[
              '📞 Book a free initial kōrero / Tono he kōrero tuatahi kore utu',
              '📝 Share your cloud needs or goals / Tohaina ō hiahia kapua, whāinga rānei',
              '🎯 Receive a tailored cloud solution / Ka whiwhi koe i tētahi otinga kapua kua whakaritea',
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
            Contact our cloud team to unlock flexible, secure solutions for your Māori business or whānau. <br />
            Whakapā mai ki tō mātou rōpū kapua ki te whakawātea i ngā otinga ngāwari, haumaru mō tō pakihi Māori, whānau rānei.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
            aria-label="Contact our cloud solutions team"
          >
            Talk to Our Cloud Team / Kōrero ki Tō Mātou Rōpū Kapua
          </Link>
        </section>

        <section className="testimonial-section">
          <h2 className="h3 text-center mb-4">What Our Whānau Say / Ngā Kōrero a te Iwi</h2>
          <div id="cloudSolutionsCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {[
                {
                  quote: "Moving to the cloud with WhānauTech made our invoicing and video calls so much easier!",
                  author: "Wiremu, Ōtaki",
                },
                {
                  quote: "Their cloud solutions gave our business the flexibility to work from anywhere. Ka rawe!",
                  author: "Ana, Christchurch",
                },
                {
                  quote: "WhānauTech’s support for our cloud setup was seamless and empowering!",
                  author: "Hemi, Palmerston North",
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
              data-bs-target="#cloudSolutionsCarousel"
              data-bs-slide="prev"
              aria-label="Previous testimonial"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#cloudSolutionsCarousel"
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
                    data-bs-target="#cloudSolutionsCarousel"
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

export default CloudSolutions;