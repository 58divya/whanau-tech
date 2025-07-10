import React from 'react';
import { Link } from 'react-router-dom';
import './tech.css';

const DigitalEducation = () => {
  return (
    <main className="digital-education-landing min-vh-100 bg-light">
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeIn">
            Digital Education
          </h1>
          <p className="lead mb-4">
            Empowering whānau and Māori communities with the digital skills needed for today's world.
          </p>
          <Link
            to="/book-education"
            className="btn btn-primary btn-lg"
            aria-label="Book a digital education workshop"
          >
            Book a Workshop
          </Link>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="h3 text-center mb-4">Our Workshops</h2>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {[
            { icon: '💻', text: 'Basic computer skills' },
            { icon: '📱', text: 'Mobile device mastery' },
            { icon: '🌐', text: 'Internet safety & security' },
            { icon: '📊', text: 'Using digital tools for business' },
            { icon: '🎥', text: 'Online communication & collaboration' },
          ].map((workshop, index) => (
            <div key={index} className="col">
              <div className="card h-100 shadow-sm animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="card-body d-flex align-items-start">
                  <span className="fs-3 me-3">{workshop.icon}</span>
                  <p className="card-text">{workshop.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-5 bg-white p-4 rounded shadow">
        <h2 className="h3 text-center mb-4">Why Digital Education?</h2>
        <p className="fs-5 text-muted text-center">
          Digital literacy is key to unlocking new opportunities for growth, connection, and empowerment within our communities. Our education programs are designed with tikanga Māori at heart.
        </p>
      </section>

      <section className="container py-5">
        <h2 className="h3 text-center mb-4">What Our Whānau Say</h2>
        <div id="digitalEducationCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {[
              {
                quote: "The digital workshops boosted my confidence to run my online shop. Highly recommend!",
                author: "Hemi, Tāmaki Makaurau",
              },
              {
                quote: "Learning internet safety was empowering for our whānau. We feel safer online now!",
                author: "Mere, Rotorua",
              },
              {
                quote: "The workshops taught us how to use digital tools to grow our small business. Ka rawe!",
                author: "Kiri, Wellington",
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
            data-bs-target="#digitalEducationCarousel"
            data-bs-slide="prev"
            aria-label="Previous testimonial"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#digitalEducationCarousel"
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
                  data-bs-target="#digitalEducationCarousel"
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
  );
};

export default DigitalEducation;