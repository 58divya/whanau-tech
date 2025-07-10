// src/components/AdvisorSection.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import translations from "./translations";
import './AdvisorList.css';

function AdvisorSection({ selectedLanguage }) {
  const [advisors, setAdvisors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = translations[selectedLanguage]?.advisors || translations.en.advisors;

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/advisors')
      .then(res => setAdvisors(res.data))
      .catch(err => console.error("Error fetching advisors:", err));
  }, []);

  useEffect(() => {
    if (advisors.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % advisors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [advisors]);

  const advisor = advisors[currentIndex];

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + advisors.length) % advisors.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % advisors.length);
  };

  return (
   <section id="advisor-stories" className="advisor-carousel-section py-5" style={{ backgroundColor: "#e6f2ff" }}>
      <div className="container">
        <h2 className="mb-5" style={{ color: "#004466", textAlign: "center" }}>{t.title}</h2>

        {advisor ? (
          <div className="advisor-carousel d-flex align-items-center justify-content-center">
            <div className="advisor-text col-md-6">
              <h3>{advisor.name}</h3>
              <p className="advisor-expertise">{advisor.expertise}</p>
              {/* Optional: Add a testimonial or quote here */}
            </div>

            <div className="advisor-image col-md-6 d-flex justify-content-center">
              <img
                src={advisor.photo_url}
                alt={advisor.name}
                className="rounded advisor-photo shadow"
              />
            </div>
          </div>
        ) : (
          <p className="text-center">{t.noAdvisors}</p>
        )}

        {/* Navigation Arrows */}
        <div className="advisor-carousel-nav mt-4 d-flex justify-content-center gap-4">
          <button onClick={goPrev} aria-label="Previous advisor" className="nav-button">&larr;</button>
          <button onClick={goNext} aria-label="Next advisor" className="nav-button">&rarr;</button>
        </div>

        {/* Dots */}
        <div className="advisor-carousel-dots mt-3 d-flex justify-content-center gap-2">
          {advisors.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to advisor ${idx + 1}`}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === "Enter") setCurrentIndex(idx); }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdvisorSection;