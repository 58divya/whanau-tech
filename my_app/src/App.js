import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';
import AdvisorList from './components/AdvisorList';
import AdvisorSection from './components/AdvisorSection';
import ContactForm from './ContactSection';
import HeroSection from './components/HeroSection';
import ServiceSection from './components/ServiceSection';

function App() {
        const [isDarkMode, setIsDarkMode] = useState(false);
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [selectedLanguage, setSelectedLanguage] = useState('en');

        // Check for dark mode preference from localStorage on initial load
        useEffect(() => {
          const savedDarkMode = localStorage.getItem('dark-mode') === 'enabled';
          setIsDarkMode(savedDarkMode);
          if (savedDarkMode) {
            document.body.classList.add('dark-mode');
          }
        }, []);

        // Toggle dark mode
        const toggleDarkMode = () => {
          setIsDarkMode(!isDarkMode);
          document.body.classList.toggle('dark-mode');
          localStorage.setItem('dark-mode', !isDarkMode ? 'enabled' : 'disabled');
        };

        // Toggle mobile menu
        const toggleMenu = () => {
          setIsMenuOpen(!isMenuOpen);
        };

        const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    // In a real-world app, you would also update your app's language setting here
      };

        return (
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

                {/* Language Dropdown */}
                <div className="language-dropdown">
                  <select onChange={handleLanguageChange} value={selectedLanguage} className="language-select">
                    <option value="en">English</option>
                    <option value="mi">Te Reo Māori</option>
                    {/* Add more languages here */}
                  </select>
                </div>

                {/* Login and Signup Buttons */}
                <div className="auth-buttons">
                  <button className="btn btn-outline-light me-2">Login</button>
                  <button className="btn btn-primary">Sign Up</button>
                </div>


                {/* Dark Mode Toggle */}
                <div className="dark-mode-toggle" onClick={toggleDarkMode}>
                  <i className={isDarkMode ? "fas fa-moon" : "fas fa-sun"}></i>
                </div>
              </div>
            </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServiceSection />

      {/* Advisor List Section */}
      <AdvisorList />

      {/* Advisor Section */}
      <AdvisorSection/>


      {/* About Section */}
      <section id="about" className="py-5 bg-dark text-white">
        <div className="container">
          <h2 className="text-center mb-5">Mō Mātou</h2>
          <div className="section-divider"></div>
          <p className="lead text-center">
            We are committed to empowering Māori individuals and businesses through technology, guided by the values of manaakitanga, whanaungatanga, and kaitiakitanga. Our mission is to bridge the digital divide and foster innovation in Aotearoa.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Whakapā Mai</h2>
          <div className="section-divider"></div>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; 2025 WhānauTech. Aroha mai, aroha atu.</p>
      </footer>
    </div>
  );
}
export default App;