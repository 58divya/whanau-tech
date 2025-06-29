import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import AdvisorList from './components/AdvisorList';
import AdvisorSection from './components/AdvisorSection';
import ContactForm from './ContactSection';
import HeroSection from './components/HeroSection';
import ServiceSection from './components/ServiceSection';
import Chatbot from './components/Chatbot';
import AboutSection from './components/AboutSection';

import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('dark-mode') === 'enabled';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', !isDarkMode ? 'enabled' : 'disabled');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="container">
            <a href="#" className="logo">
              <img src="logo.png" alt="WhānauTech Logo" />
            </a>
            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <li><a href="#home"><i className="fas fa-home"></i> Home</a></li>
              <li><a href="#services"><i className="fas fa-cogs"></i> Services</a></li>
              <li><a href="#about"><i className="fas fa-info-circle"></i> About</a></li>
              <li><a href="#contact"><i className="fas fa-envelope"></i> Contact</a></li>
            </ul>

            <div className="menu-toggle" onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
            </div>

            <div className="language-dropdown">
              <select onChange={handleLanguageChange} value={selectedLanguage} className="language-select">
                <option value="en">English</option>
                <option value="mi">Te Reo Māori</option>
              </select>
            </div>

            {/* 👇 Update Buttons to Use React Router's Link */}
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </div>

            <div className="dark-mode-toggle" onClick={toggleDarkMode}>
              <i className={isDarkMode ? "fas fa-moon" : "fas fa-sun"}></i>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Main Homepage Route */}
          <Route path="/" element={
            <>
              <HeroSection />
              <ServiceSection />
              <AdvisorList />
              <AdvisorSection />
              <Chatbot />
              <AboutSection />
              <section id="contact" className="py-5">
                <div className="container">
                  <h2 className="text-center mb-5">Whakapā Mai</h2>
                  <div className="section-divider"></div>
                  <ContactForm />
                </div>
              </section>
              <footer className="bg-dark text-white text-center py-3">
                <p>&copy; 2025 WhānauTech. Aroha mai, aroha atu.</p>
              </footer>
            </>
          } />

          {/* Login and Register Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;