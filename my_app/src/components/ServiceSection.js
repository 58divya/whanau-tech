
import React, { useState } from 'react';
import '../App.css';

const ServicesSection = () => {
  return (
    <section id="services" className="py-5" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container">
        <h2 className="text-center mb-5">Ō Mātou Ratonga</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <h5 className="card-title">Technology Consultation</h5>
                <p className="card-text">Tailored advice to help Māori businesses leverage technology for growth.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <h5 className="card-title">Digital Education</h5>
                <p className="card-text">Workshops and training to build tech skills in our communities.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <h5 className="card-title">IT Support</h5>
                <p className="card-text">Reliable support to keep your systems running smoothly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;