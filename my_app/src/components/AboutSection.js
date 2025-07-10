import React from "react";
import translations from "./translations";
import aboutImage from '../pictures/about-src.jpg';

function AboutSection({ selectedLanguage }) {
  const t = translations[selectedLanguage].about;

  return (
    <section id="about" className="about-section py-5" style={{ backgroundColor: '#e6f2ff' }}>
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
    </section>
  );
}

export default AboutSection;