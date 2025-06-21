import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import axios from 'axios';
import './App.css';
import './components/ContactSection';

function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#">Tūhono Tech</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#home">Kāinga</a></li>
              <li className="nav-item"><a className="nav-link" href="#services">Ratonga</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">Mō Mātou</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Whakapā</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section d-flex align-items-center text-center text-white" style={{ background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', minHeight: '100vh' }}>
        <div className="container">
          <h1 className="display-4">Tūhono ki te Ao Hangarau</h1>
          <p className="lead">Empowering Māori communities through technology consultation and education.</p>
          <a href="#contact" className="btn btn-primary btn-lg mt-3">Whakapā Mai</a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="container">
          <h2 className="text-center mb-5">Ō Mātou Ratonga</h2>
          <div className="section-divider"></div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <i className="fas fa-laptop-code fa-2x mb-3" style={{ color: 'var(--pounamu-green)' }}></i>
                  <h5 className="card-title">Technology Consultation</h5>
                  <p className="card-text">
                    Tailored advice to help Māori businesses leverage technology for growth and innovation, fostering digital empowerment across Aotearoa.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <i className="fas fa-chalkboard-teacher fa-2x mb-3" style={{ color: 'var(--pounamu-green)' }}></i>
                  <h5 className="card-title">Digital Education</h5>
                  <p className="card-text">
                    Workshops and training to build tech skills in our communities, bridging the digital divide with hands-on learning opportunities.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <i className="fas fa-tools fa-2x mb-3" style={{ color: 'var(--pounamu-green)' }}></i>
                  <h5 className="card-title">IT Support</h5>
                  <p className="card-text">
                    Reliable support to keep your systems running smoothly, ensuring your business stays connected and operational.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 bg-dark text-white">
        <div className="container">
          <h2 className="text-center mb-5">Mō Mātou</h2>
          <div className="section-divider"></div>
          <p className="lead text-center">We are committed to empowering Māori individuals and businesses through technology, guided by the values of manaakitanga, whanaungatanga, and kaitiakitanga. Our mission is to bridge the digital divide and foster innovation in Aotearoa.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Whakapā Mai</h2>
          <div className="section-divider"></div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Ingoa (Name)</label>
                      <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Īmēra (Email)</label>
                      <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Kōrero (Message)</label>
                      <textarea className="form-control" id="message" rows="5" placeholder="Your message"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Tukuna (Send)</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; 2025 Tūhono Tech. Aroha mai, aroha atu.</p>
      </footer>
    </div>
  );
}

export default App;
