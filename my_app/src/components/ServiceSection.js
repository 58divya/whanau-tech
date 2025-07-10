import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import translations from './translations'; // Adjust if needed
import '../App.css';

const ServicesSection = ({ selectedLanguage }) => {
  const scrollRef = useRef();
  const [isHovered, setIsHovered] = useState(false); // Track hover

  // Handle both mouse and touch interactions
  const handlePause = () => setIsHovered(true);
  const handleResume = () => setIsHovered(false);

  // Manual scroll buttons
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // 🔄 Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });

        // Optional: loop back to start if near end
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 2000); // Auto-scroll every 2 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [isHovered]); // Runs again if hover changes

  const serviceLinks = [
    '/technology-consultation',
    '/digital-education',
    '/it-support',
    '/cybersecurity-guidance',
    '/cloud-solutions',
    '/custom-software'
  ];

  const services = translations[selectedLanguage]?.services?.items || [];
  const sectionTitle = translations[selectedLanguage]?.services?.title || 'Our Services';

  return (
    <section id="services" className="py-5 services-section" role="region" aria-labelledby="services-title" style={{ backgroundColor: '#e6f2ff',
      color: '#004466'
    }}>
      <div className="container my-5">
        <h2 id="services-title" className="text-center mb-4" style={{color: '#004466'}}>{sectionTitle}</h2>

        <div className="position-relative">
          {/* Left Scroll Button */}
          {/* Left Button */}
          <button
            className="scroll-button scroll-button-left"
            onClick={scrollLeft}
            aria-label="Scroll services left"
            type="button"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="scroll-container d-flex overflow-auto px-3"
            style={{ scrollBehavior: 'smooth', gap: '1rem' }}
            tabIndex={0}
           onMouseEnter={handlePause}
          onMouseLeave={handleResume}
          onTouchStart={handlePause}
          onTouchEnd={handleResume}
          onTouchCancel={handleResume}
          >
            {services.map((service, index) => (
              <Link
                to={serviceLinks[index] || '#'}
                key={index}
                className="card flex-shrink-0 text-decoration-none text-dark service-card animated-gradient-bg"
                style={{
                  color: '#ffffff',
                  width: '300px',
                  height: '100px',
                  minWidth: '300px',
                  maxWidth: '320px',
                  margin: '0 0.5rem',
                  textAlign: 'center',
                  padding: '1rem',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <i className={`fas ${getServiceIcon(index)} fa-2x mb-3`} style={{ color: '#ffffff' }}></i>
                  <h5 className="card-title mb-2">{service.title}</h5>
                  <p className="card-text" style={{ fontSize: '0.9rem' }}>{service.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Scroll Button */}
            <button
          className="scroll-button scroll-button-right"
          onClick={scrollRight}
          aria-label="Scroll services right"
          type="button"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        </div>
      </div>
    </section>
  );
};

// Font Awesome icons
const getServiceIcon = (index) => {
  const icons = [
    'fa-lightbulb',     // Technology Consultation
    'fa-book-open',     // Digital Education
    'fa-laptop-code',   // IT Support
    'fa-shield-alt',    // Cybersecurity Guidance
    'fa-cloud',         // Cloud Solutions
    'fa-code'           // Custom Software
  ];
  return icons[index % icons.length] || 'fa-cogs';
};

export default ServicesSection;
