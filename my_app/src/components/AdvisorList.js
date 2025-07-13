import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import translations from "./translations";

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
    <section id="advisor-section" className="advisor-section position-relative py-5">

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

    </section>
  );
}

export default AdvisorList;