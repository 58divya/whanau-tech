import React from 'react';
import { Link } from 'react-router-dom';
import './tech.css';

const ITSupport = () => {
  return (
    <div className="tech-consultation-page min-vh-100 bg-light">
      <header className="hero-section py-5 bg-primary text-white text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeIn">
            IT Support / Tautoko Hangarau
          </h1>
          <p className="lead mb-4">
            Reliable and friendly IT support tailored to help Māori businesses and whānau keep their systems running smoothly. <br />
            He tautoko hangarau pono, whakahoahoa hoki, kua whakaritea hei āwhina i ngā pakihi Māori me te whānau kia rere mārika ō rātou pūnaha.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
            aria-label="Contact us for IT support"
          >
            Contact Us / Whakapā Mai
          </Link>
        </div>
      </header>

      <main className="container py-5">
        <section className="services-section mb-5">
          <h2 className="h3 text-center mb-4">Our Support Services / Ā Mātou Ratonga Tautoko</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {[
              { icon: '💻', text: 'Troubleshooting hardware and software issues / Whakatika i ngā raruraru taputapu me te pūmanawa' },
              { icon: '🔧', text: 'Installation and setup of devices and networks / Whakaurunga me te whakarite taputapu me ngā whatunga' },
              { icon: '🛡️', text: 'Antivirus and malware protection / Parenga wheori me te kino pūmanawa' },
              { icon: '⚙️', text: 'System maintenance and updates / Tiaki pūnaha me ngā whakahou' },
              { icon: '📞', text: 'Remote and onsite support options / Kōwhiringa tautoko mamao me te pae' },
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
            At WhānauTech, we believe technology should uplift and empower tangata whenua. Our IT support is personalized, responsive, and grounded in tikanga Māori, ensuring your systems are reliable so you can focus on your kaupapa. <br />
            I WhānauTech, e whakapono ana mātou me whai hua te hangarau ki te whakakaha i te tangata whenua. E ū ana ā mātou tautoko ki te tikanga Māori, kia pono ō pūnaha kia tūhono ai koe ki tō kaupapa.
          </p>
        </section>

        <section className="how-section mb-5">
          <h2 className="h3 text-center mb-4">How It Works / Me Pēhea te Mahi</h2>
          <ol className="list-group list-group-numbered">
            {[
              '📞 Book a free initial kōrero / Tono he kōrero tuatahi kore utu',
              '📝 Share your technical issues or goals / Tohaina ō raruraru hangarau, whāinga rānei',
              '🎯 Receive tailored IT support solutions / Ka whiwhi koe i ngā otinga tautoko kua whakaritea',
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
            Contact our IT support team to keep your systems running smoothly and take the next step in your digital journey. <br />
            Whakapā mai ki tō mātou rōpū tautoko hangarau kia rere mārika ō pūnaha, kia anga whakamua i tō haerenga matihiko.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
            aria-label="Contact us for IT support"
          >
            Contact Us / Whakapā Mai
          </Link>
        </section>

        <section className="testimonial-section">
          <h2 className="h3 text-center mb-4">What Our Whānau Say / Ngā Kōrero a te Iwi</h2>
          <div id="itSupportCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {[
                {
                  quote: "WhānauTech’s IT support transformed our small business with quick, reliable solutions.",
                  author: "Tane, Whangārei",
                },
                {
                  quote: "Their team set up our network seamlessly, and we feel supported every step of the way.",
                  author: "Hine, Tauranga",
                },
                {
                  quote: "Thanks to WhānauTech, our systems are secure, and we operate with confidence!",
                  author: "Rangi, Dunedin",
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
              data-bs-target="#itSupportCarousel"
              data-bs-slide="prev"
              aria-label="Previous testimonial"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#itSupportCarousel"
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
                    data-bs-target="#itSupportCarousel"
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

export default ITSupport;