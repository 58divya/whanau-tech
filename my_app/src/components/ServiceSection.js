import React, { useRef } from 'react';
import '../App.css';

const ServicesSection = () => {
  const scrollRef = useRef();

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const services = [
    { title: 'Technology Consultation', description: 'Tailored advice to help Māori businesses leverage technology for growth.' },
    { title: 'Digital Education', description: 'Workshops and training to build tech skills in our communities.' },
    { title: 'IT Support', description: 'Reliable support to keep your systems running smoothly.' },
    { title: 'Cybersecurity Guidance', description: 'Protecting Māori data with modern cyber protection strategies.' },
    { title: 'Cloud Solutions', description: 'Enabling flexible work environments with cloud tools.' },
    { title: 'Custom Software', description: 'Build bespoke tools that align with your kaupapa.' }
  ];

  return (
    <section id="services" className="py-5" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container">
        <h2 className="text-center mb-5">Ō Mātou Ratonga</h2>
        <div className="scroll-container-wrapper position-relative">
          <div ref={scrollRef} className="scroll-container d-flex overflow-auto">
            {services.map((service, index) => (
              <div className="card flex-shrink-0" style={{ width: '450px', marginRight: '12px' }} key={index}>
                <div className="card-body text-center">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="scroll-next btn btn-primary position-absolute end-0 top-50 translate-middle-y" onClick={scrollRight}>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;