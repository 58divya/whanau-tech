import React from 'react';
import { Link } from 'react-router-dom';
import './tech.css';

const CustomSoftware = () => {
  return (
    <div className="tech-consultation-page min-vh-100 bg-light">
      <header className="hero-section py-5 bg-primary text-white text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeIn">
            Custom Software / Pūmanawa Whakarite
          </h1>
          <p className="lead mb-4">
            We build software that fits your kaupapa — from websites to mobile apps — tailored to Māori values, business needs, and community impact. <br />
            Ka hanga mātou i ngā pūmanawa e hāngai ana ki tō kaupapa — mai i ngā paetukutuku ki ngā taupānga pūkoro — kua whakaritea ki ngā uara Māori, ngā hiahia pakihi, me te pānga hapori.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
            aria-label="Start your custom software project"
          >
            Start Your Project / Tīmata Tō Kaupapa
          </Link>
        </div>
      </header>

      <main className="container py-5">
        <section className="services-section mb-5">
          <h2 className="h3 text-center mb-4">What We Can Build / He Aha tā Mātou e Hanga Ai</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {[
              { icon: '🌐', text: 'Websites and e-commerce platforms / Paetukutuku me ngā papa hokohoko' },
              { icon: '📱', text: 'Mobile apps (iOS & Android) / Taupānga pūkoro (iOS me Android)' },
              { icon: '📅', text: 'Booking and scheduling systems / Pūnaha tono me te whakarite wā' },
              { icon: '🤝', text: 'Community and education platforms / Papa hapori me te mātauranga' },
              { icon: '📊', text: 'Data dashboards and admin tools / Papatohu raraunga me ngā taputapu whakahaere' },
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
            At WhānauTech, we create software that empowers tangata whenua, respects tikanga Māori, and supports your vision. Our solutions enhance community connection and drive meaningful impact for Māori businesses and whānau. <br />
            I WhānauTech, ka hanga mātou i ngā pūmanawa e whakakaha ana i te tangata whenua, e whakaute ana i te tikanga Māori, e tautoko ana i tō tirohanga. Ka whakapakari ā mātou otinga i te hononga hapori me te whai pānga nui ki ngā pakihi Māori me te whānau.
          </p>
        </section>

        <section className="how-section mb-5">
          <h2 className="h3 text-center mb-4">How It Works / Me Pēhea te Mahi</h2>
          <ol className="list-group list-group-numbered">
            {[
              '📞 Book a free initial kōrero / Tono he kōrero tuatahi kore utu',
              '📝 Share your software needs or ideas / Tohaina ō hiahia pūmanawa, whakaaro rānei',
              '🎯 Receive a tailored software solution / Ka whiwhi koe i tētahi otinga pūmanawa kua whakaritea',
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
            Contact our team to start building custom software that supports your kaupapa and drives impact. <br />
            Whakapā mai ki tō mātou rōpū ki te tīmata i te hanga pūmanawa whakarite e tautoko ana i tō kaupapa me te whai pānga.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
            aria-label="Start your custom software project"
          >
            Start Your Project / Tīmata Tō Kaupapa
          </Link>
        </section>

        <section className="testimonial-section">
          <h2 className="h3 text-center mb-4">What Our Whānau Say / Ngā Kōrero a te Iwi</h2>
          <div id="customSoftwareCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {[
                {
                  quote: "WhānauTech turned our marae’s idea into a beautiful, easy-to-use app. Ka rawe!",
                  author: "Mereana, Ngāti Porou",
                },
                {
                  quote: "Their custom website helped our business reach new customers. Highly recommend!",
                  author: "Tama, Auckland",
                },
                {
                  quote: "The software WhānauTech built for our community platform is a game-changer!",
                  author: "Rewi, Hamilton",
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
              data-bs-target="#customSoftwareCarousel"
              data-bs-slide="prev"
              aria-label="Previous testimonial"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#customSoftwareCarousel"
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
                    data-bs-target="#customSoftwareCarousel"
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

export default CustomSoftware;