// src/components/AdvisorList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdvisorList() {
  const [advisors, setAdvisors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/advisors')
      .then(res => setAdvisors(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="advisors" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Our Tech Advisors</h2>
        <div className="row">
          {advisors.map(advisor => (
            <div className="col-md-4 mb-4" key={advisor.id}>
              <div className="card h-100 text-center">
                <img src={advisor.photo_url} className="card-img-top" alt={advisor.name} />
                <div className="card-body">
                  <h5 className="card-title">{advisor.name}</h5>
                  <p className="card-text">{advisor.expertise}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdvisorList;