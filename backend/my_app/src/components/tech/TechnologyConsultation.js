import React from 'react';
import { Link } from 'react-router-dom';
import './tech.css';

const TechnologyConsultation = () => {
  return (
    <div className="tech-consultation-page min-vh-100 bg-light">
      <header className="hero-section py-5 bg-primary text-white text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeIn">
            Technology Consultation / Tohutohu Hangarau
          </h1>
          <p className="lead mb-4">
            Tailored tech advice to help your whānau or Māori business thrive in the digital world. <br />
            He tohutohu hangarau kua whakaritea hei āwhina i tō whānau, pakihi Māori hoki, kia angitū i te ao matihiko.
          </p>
          <Link
            to="/book-now"
            className="btn btn-primary btn-lg"
            aria-label="Book a consultation now"
          >
            Book Now / Tono Ināianei
          </Link>
        </div>
      </header>

      <main className="container py-5">
        <section className="services-section mb-5">
          <h2 className="h3 text-center mb-4">Our Services / Ā Mātou Ratonga</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {[
              { icon: '💡', text: 'Custom tech strategy sessions / Ngā rautaki hangarau kua whakaritea' },
              { icon: '🌐', text: 'Website & digital presence guidance / Āwhina mō te paetukutuku me te ao matihiko' },
              { icon: '📱', text: 'App & software recommendations / Tūtohutanga taupānga me ngā pūmanawa' },
              { icon: '🔧', text: 'Systems setup and digital toolkits / Whirihoranga pūnaha me ngā taputapu matihiko' },
              { icon: '🧠', text: 'Upskilling & capability-building support / Āwhina whakakaha pūkenga' },
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
            At WhānauTech, we believe technology should uplift and empower tangata whenua. Our consultation services are grounded in tikanga Māori and ensure that digital solutions support your kaupapa, enhance community connection, and protect your data sovereignty. <br />
            I WhānauTech, e whakapono ana mātou me whai hua te hangarau ki te whakakaha i te tangata whenua. E ū ana ā mātou ratonga ki te tikanga Māori, kia ū hoki ngā otinga matihiko ki tō kaupapa, āwhina i te hononga ā-hapori, me te tiaki i ō raraunga.
          </p>
        </section>

        <section className="how-section mb-5">
          <h2 className="h3 text-center mb-4">How It Works / Me Pēhea te Mahi</h2>
          <ol className="list-group list-group-numbered">
            {[
              '📞 Book a free initial kōrero / Tono he kōrero tuatahi kore utu',
              '📝 Share your goals or digital challenges / Tohaina ō whāinga, wero rānei',
              '🎯 Receive a tailored plan / Ka whiwhi koe i tētahi mahere kua whakaritea',
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
            Book a consultation with one of our tech advisors and take the8373 next step in your digital journey. <br />
            Tono i tētahi hui me tētahi kaitohutohu hangarau kia anga whakamua i tō haerenga matihiko.
          </p>
          <Link
            to="/book-now"
            className="btn btn-primary btn-lg"
            aria-label="Book a consultation now"
          >
            Book Now / Tono Ināianei
          </Link>
        </section>

        <section className="testimonial-section">
          <h2 className="h3 text-center mb-4">What Our Whānau Say / Ngā Kōrero a te Iwi</h2>
          <blockquote className="bg-white p-4 rounded shadow text-center">
            <p className="fs-5 fst-italic text-muted">
              "WhānauTech helped us get our small kai business online. Now we’re reaching more people than ever!" <br />
              – Aroha, Kirikiriroa
            </p>
          </blockquote>
        </section>
      </main>
    </div>
  );
};

export default TechnologyConsultation;