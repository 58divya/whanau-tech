
     import React from 'react';

     function HeroSection() {
       return (
         <section 
         id="home" 
        className="hero-section d-flex align-items-center text-center text-white" 
        >
      <div className="container">
        <h1 className="display-4">Tūhono ki te Ao Hangarau</h1>
        <p className="lead">Empowering Māori communities through technology consultation and education.</p>
        <button 
  className="btn btn-primary btn-lg mt-3" 
  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
>
  Whakapā Mai
</button>

      </div>
    </section>
       );
     }

     export default HeroSection;