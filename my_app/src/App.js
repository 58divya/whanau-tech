import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdvisorList from "./components/AdvisorList";
import ContactForm from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import ServiceSection from "./components/ServiceSection";
import Chatbot from "./components/Chatbot";
import AboutSection from "./components/AboutSection";
import AppNavbar from "./components/AppNavbar";
import translations from "./components/translations";
import TestimonialSection from "./components/TestimonialSection";
import AdvisorProfile from "./components/AdvisorProfile";

// Import Technology Consultation page components
import TechnologyConsultationLanding from "./components/tech/TechnologyConsultation";
import DigitalEducation from "./components/tech/DigitalEducation";
import ITSupport from "./components/tech/ITSupports";
import CybersecurityGuidance from "./components/tech/CybersecurityGuidance";
import CloudSolutions from "./components/tech/CloudSolutions";
import CustomSoftware from "./components/tech/CustomSoftware";

function App() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState("en");

	useEffect(() => {
		const savedDarkMode = localStorage.getItem("dark-mode") === "enabled";
		setIsDarkMode(savedDarkMode);
		if (savedDarkMode) {
			document.body.classList.add("dark-mode");
		}
	}, []);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		document.body.classList.toggle("dark-mode");
		localStorage.setItem("dark-mode", !isDarkMode ? "enabled" : "disabled");
	};

	const handleLanguageChange = (lang) => {
		setSelectedLanguage(lang);
	};

	return (
		<Router>
			<div className="App">
				{/* Navbar outside Routes so it shows on all pages */}
				<AppNavbar
					isDarkMode={isDarkMode}
					toggleDarkMode={toggleDarkMode}
					selectedLanguage={selectedLanguage}
					handleLanguageChange={handleLanguageChange}
					translations={translations[selectedLanguage]}
				/>

				<Routes>
					<Route
						path="/"
						element={
							<>
								<HeroSection selectedLanguage={selectedLanguage} />
								<ServiceSection selectedLanguage={selectedLanguage} />
								<AdvisorList selectedLanguage={selectedLanguage} />
								<Chatbot selectedLanguage={selectedLanguage} />
								<AboutSection selectedLanguage={selectedLanguage} />
								<TestimonialSection selectedLanguage={selectedLanguage} />
								<ContactForm selectedLanguage={selectedLanguage} />
							</>
						}
					/>

					<Route
						path="/technology-consultation"
						element={
							<TechnologyConsultationLanding
								selectedLanguage={selectedLanguage}
							/>
						}
					/>
					<Route
						path="/digital-education"
						element={<DigitalEducation selectedLanguage={selectedLanguage} />}
					/>
					<Route
						path="/it-support"
						element={<ITSupport selectedLanguage={selectedLanguage} />}
					/>
					<Route
						path="/cybersecurity-guidance"
						element={
							<CybersecurityGuidance selectedLanguage={selectedLanguage} />
						}
					/>
					<Route
						path="/cloud-solutions"
						element={<CloudSolutions selectedLanguage={selectedLanguage} />}
					/>
					<Route
						path="/custom-software"
						element={<CustomSoftware selectedLanguage={selectedLanguage} />}
					/>
					<Route
						path="/advisors"
						element={<AdvisorList selectedLanguage={selectedLanguage} />}
					/>
					<Route
						path="/advisor/:id"
						element={<AdvisorProfile selectedLanguage={selectedLanguage} />}
					/>
				</Routes>

				{/* Single Footer for all pages */}
				<footer className="bg-dark text-white text-center py-4">
					<p>&copy; 2025 WhānauTech. Aroha mai, aroha atu.</p>
				</footer>
			</div>
		</Router>
	);
}

export default App;
