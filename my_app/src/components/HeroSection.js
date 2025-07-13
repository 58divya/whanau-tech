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
      id="home" 
      className="hero-section d-flex align-items-center  text-white"
    >
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
    </section>
  );
}

export default HeroSection;