
     import React from 'react';

     function HeroSection() {
       return (
         <section 
         id="home" 
        className="hero-section d-flex align-items-center text-center text-white" 
        style={{ 
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://via.placeholder.com/1920x600?text=Aotearoa+Landscape")', 
          backgroundSize: 'cover', 
          minHeight: '100vh' 
        }}
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