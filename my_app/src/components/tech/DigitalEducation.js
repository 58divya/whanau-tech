import React from 'react';
import { Link } from 'react-router-dom';
import './tech.css';

const DigitalEducation = () => {
  return (
    <div className="digital-education-page min-vh-100 bg-light">
      <header className="hero-section py-5 bg-primary text-white text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeIn">
            Digital Education / Mātauranga Matihiko
          </h1>
          <p className="lead mb-4">
            Empowering whānau and Māori communities with essential digital skills for today’s world. <br />
            Hei whakakaha i te whānau me te iwi Māori mā te mātauranga matihiko.
          </p>
          <Link
            to="/book-education"
            className="btn btn-primary btn-lg"
            aria-label="Book a digital education workshop"
          >
            Book a Workshop / Tono i tētahi Awheawhe
          </Link>
        </div>
      </header>

      <main className="container py-5">
        <section className="services-section mb-5">
          <h2 className="h3 text-center mb-4">Our Workshops / Ā Mātou Awheawhe</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {[
              { icon: '💻', text: 'Basic computer skills / Ngā pūkenga rorohiko tuatahi' },
              { icon: '📱', text: 'Mobile device mastery / Te whakamahi i ngā pūrere pūkoro' },
              { icon: '🌐', text: 'Internet safety & security / Haumarutanga ipurangi' },
              { icon: '📊', text: 'Using digital tools for business / Taputapu matihiko mō te pakihi' },
              { icon: '🎥', text: 'Online communication & collaboration / Te kōrero me te mahi tahi ā-ipurangi' },
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

        <section className="why-section mb-5 bg-white p-4 rounded shadow">
          <h2 className="h3 text-center mb-4">Why This Matters / He Aha Tēnei e Hirahira Ai</h2>
          <p className="fs-5 text-muted">
            Digital literacy unlocks new opportunities for our people. Our workshops are shaped by tikanga Māori and help whānau thrive in a connected, digital world. <br />
            Mā te mātauranga matihiko e whakatuwhera ngā ara hou mō te iwi. E ārahi ana ā mātou awheawhe e te tikanga Māori, ā, hei painga mō te whānau i te ao matihiko.
          </p>
        </section>

        <section className="how-section mb-5">
          <h2 className="h3 text-center mb-4">How It Works / Me Pēhea te Mahi</h2>
          <ol className="list-group list-group-numbered">
            {[
              '📞 Book your free digital education session / Tono he awheawhe kore utu',
              '📝 Let us know your goals or current knowledge / Kōrero mai mō ō whāinga me ō mōhiotanga',
              '🎯 Attend the workshop and gain practical skills / Haere ki te awheawhe, ka ako i ngā pūkenga',
            ].map((step, index) => (
              <li key={index} className="list-group-item d-flex align-items-start">
                <span className="fs-3 me-3">{step.split(' ')[0]}</span>
                <span>{step.slice(2)}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="cta-section mb-5 text-center bg-primary text-white p-4 rounded">
          <h2 className="h3 mb-4">Ready to Learn? / Kua Reri koe ki te Ako?</h2>
          <p className="fs-5 mb-4">
            Join one of our community-based digital education workshops today. <br />
            Whakauru mai ki tētahi o ā mātou awheawhe mātauranga matihiko ā-hapori.
          </p>
          <Link
            to="/book-education"
            className="btn btn-primary btn-lg"
            aria-label="Book a digital education workshop"
          >
            Book a Workshop / Tono Ināianei
          </Link>
        </section>

        <section className="testimonial-section">
          <h2 className="h3 text-center mb-4">What Our Whānau Say / Ngā Kōrero a te Iwi</h2>
          <blockquote className="bg-white p-4 rounded shadow text-center">
            <p className="fs-5 fst-italic text-muted">
              "Learning internet safety gave our tamariki confidence online. It’s made a huge difference for our whānau!" <br />
              – Hana, Ōtautahi
            </p>
          </blockquote>
        </section>
      </main>
    </div>
  );
};

export default DigitalEducation;