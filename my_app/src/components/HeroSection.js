import React, { useState, useEffect } from 'react';

function HeroSection() {
  const messages = [
    "Empowering Māori communities \n through technology consultation and education.",
    "Connecting whānau \n with modern tech solutions.",
    "Supporting indigenous \n innovation through digital tools.",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex];
    let speed = isDeleting ? 30 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentMessage.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);

        if (charIndex === currentMessage.length) {
          setIsDeleting(true);
        }
      } else {
        setTypedText(currentMessage.slice(0, charIndex - 1));
        setCharIndex(prev => prev - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentMessageIndex]);

  return (
    <section 
      id="home text" 
      className="hero-section d-flex align-items-center  text-white"
    >
      <div className="absolute top-0 w-full h-24 overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path fill="#e6f2ff" fillOpacity="1" d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </div>
      <div className="container">
        <h1 className="display-4 fw-bold text-start">
          Connect to the <br/> World of Technology
          <br />
          <small className="d-block lead mt-4">
            {typedText.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
            <span className="blinking-cursor">|</span>
          </small>
        </h1>
        <button 
          className="btn btn-primary text-start btn-lg mt-4" 
          onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
        >
          Contact Us
        </button>
      </div>
      <div className="absolute bottom-0 w-full h-24 overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path fill="#e6f2ff" fillOpacity="1" d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
        </div>
    </section>
  );
}

export default HeroSection;