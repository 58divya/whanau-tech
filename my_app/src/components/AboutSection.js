import React from "react";
import translations from "./translations";
import aboutImage from '../pictures/about-src.jpg';

function AboutSection({ selectedLanguage }) {
  const t = translations[selectedLanguage].about;

  return (
    <section id="about" className="about-section py-5" style={{ backgroundColor: "#ffffff", padding: "4rem 2rem" }}>
      <div className="container">
        <div className="row align-items-center">

          {/* Left Text */}
          <div className="col-md-6">
            <h2 className="mb-4 text-start" style={{color: '#004466'}}>{t.title}</h2>
            <div className="section-divider mb-3"></div>
            <p className="lead text-start">{t.description}</p>
            {/* Added Know More button */}
            <button
              className="btn btn-primary mt-3"
              type="button"
              onClick={() => {
                // You can add a handler or navigation here if you want
                alert("Know more clicked!");
              }}
            >
              Read more
            </button>
          </div>

          {/* Right Image in Card */}
          <div className="col-md-6 d-flex justify-content-center" >
            <div className="card shadow-sm" style={{ maxWidth: "100%", border: "none" }}>
              <img 
                src={aboutImage}
                alt="About WhānauTech" 
                className="img-fluid rounded"
              />
            </div>
          </div>

        </div>
      </div>
      <div className="absolute bottom-0 w-full h-24 overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path fill="#e6f2ff" fillOpacity="1" d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}

export default AboutSection;