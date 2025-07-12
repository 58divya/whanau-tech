import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import translations from "./translations";
import "./AdvisorList.css";

function AdvisorList({ selectedLanguage }) {
  const [advisors, setAdvisors] = useState([]);
  const t = translations[selectedLanguage]?.advisors || translations.en.advisors;
  const navigate = useNavigate(); // ✅ Hook for navigation

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/advisors')
      .then(res => setAdvisors(res.data))
      .catch(err => console.error("Error fetching advisors:", err));
  }, []);

  return (
    <section id="advisor-section" className="advisor-section position-relative py-5" style={{ backgroundColor: '#e6f2ff' }}>
      
      <div className="slant-divider-top">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="#e6f2ff" points="0,100 100,0 100,100" />
        </svg>
      </div>

      <div className="container">
        <h2 className="mb-5" style={{ color: '#004466', textAlign: 'center' }}>{t.title}</h2>

        <div className="row justify-content-center g-4">
          {advisors.map((advisor, idx) => (
            <div key={advisor.id || idx} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <div className="advisor-card text-center">
                <div className="blob-wrapper mb-3">
                  <img
                    src={advisor.photo_url.startsWith('http')
                      ? advisor.photo_url
                      : `http://127.0.0.1:5000${advisor.photo_url}`}
                    alt={advisor.name}
                    className="blob-image"
                  />
                </div>
                <h3 className="advisor-name" style={{ color: '#004466' }}>{advisor.name}</h3>
                <p className="advisor-expertise" style={{ fontSize: '0.9rem', color: '#555' }}>{advisor.expertise}</p> {/* ✅ Expertise */}
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => navigate(`/advisor/${advisor.id}`)} // ✅ Navigate to detail page
                >
                  More Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="slant-divider-bottom">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="#e6f2ff" points="0,0 100,100 0,100" />
        </svg>
      </div>
        <div className="absolute bottom-0 w-full h-24 overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}

export default AdvisorList;