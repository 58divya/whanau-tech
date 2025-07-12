import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { motion } from 'framer-motion';
import "react-datepicker/dist/react-datepicker.css";
import './AdvisorProfile.css';

function AdvisorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [advisor, setAdvisor] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [bookedTimes, setBookedTimes] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');

  const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'true') {
        setIsDarkMode(true);
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    }, []);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/advisors/${id}`)
      .then(res => setAdvisor(res.data))
      .catch(err => console.error("Error fetching advisor details:", err));
  }, [id]);

  useEffect(() => {
    const formattedDate = date.toISOString().split('T')[0];
    axios.get(`http://127.0.0.1:5000/api/booked_slots`, {
      params: { date: formattedDate, advisor_id: id }
    })
      .then(res => setBookedTimes(res.data.booked_times))
      .catch(err => console.error("Error fetching booked slots:", err));
  }, [date, id]);

  const handleBooking = async () => {
    if (!userName || !userEmail || !time) {
      setMessage("❗ Please fill all fields.");
      return;
    }

    const dateTimeStr = `${date.toISOString().split('T')[0]}T${time}`;

    try {
      const res = await axios.post('http://127.0.0.1:5000/api/book', {
        advisor_id: advisor.id,
        advisor_name: advisor.name,
        user_name: userName,
        user_email: userEmail,
        datetime: dateTimeStr,
      });
      setMessage(`✅ ${res.data.message}`);
    } catch (err) {
      setMessage("❌ Failed to book appointment. Please try again.");
    }
  };

  if (!advisor) return <div className="container my-5 text-center">Loading advisor info...</div>;

  

  return (
    <div className={`advisor-profile-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      {/* LEFT: Image */}
      <div className="advisor-left-image">
        <img
          src={advisor.photo_url.startsWith('http')
            ? advisor.photo_url
            : `http://127.0.0.1:5000${advisor.photo_url}`}
          alt={advisor.name}
        />
      </div>

      {/* Wave Divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,0L60,16C120,32,240,64,360,85.3C480,107,600,117,720,128C840,139,960,149,1080,160C1200,171,1320,181,1380,186.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </div>

      {/* RIGHT: Bio + Booking */}
      <motion.div
        className="advisor-right-content"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2>{advisor.name}</h2>
        <p className="expertise">{advisor.expertise}</p>

        <h4>About</h4>
        <p>{advisor.bio || "No biography available at the moment."}</p>

        <h4 className="mt-4">Book an Appointment</h4>
        <div className="booking-form">
          <input
            type="text"
            placeholder="Your Name"
            className="form-input"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="form-input"
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
          />
          <DatePicker
            selected={date}
            onChange={setDate}
            dateFormat="yyyy-MM-dd"
            className="form-input"
          />
          <select
            className="form-input"
            value={time}
            onChange={e => setTime(e.target.value)}
          >
            <option value="">Select Time</option>
            {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"].map(slot => (
              <option key={slot} value={slot} disabled={bookedTimes.includes(slot)}>
                {slot} {bookedTimes.includes(slot) ? "(Booked)" : ""}
              </option>
            ))}
          </select>
          <button className="btn-book" onClick={handleBooking}>Confirm Booking</button>
          {message && <p className="booking-message">{message}</p>}
        </div>
      </motion.div>
    </div>
  );
}

export default AdvisorProfile;