import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import translations from './translations';

function AdvisorProfile({ selectedLanguage }) {
  const { id } = useParams();
  const [advisor, setAdvisor] = useState(null);
  const [date, setDate] = useState(new Date());  // initial date = now
  const [time, setTime] = useState('');
  const [bookedTimes, setBookedTimes] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');

  const t = translations[selectedLanguage]?.advisorProfile || translations.en.advisorProfile;
  console.log("Language:", selectedLanguage, "Loaded strings:", t);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/advisors/${id}`)
      .then(res => setAdvisor(res.data))
      .catch(err => console.error("Error fetching advisor details:", err));
  }, [id]);

  useEffect(() => {
    if (!date) return; // <-- safety check to prevent error if date is null
    const formattedDate = date.toISOString().split('T')[0];
    axios.get('http://127.0.0.1:5000/api/booked_slots', {
      params: { date: formattedDate, advisor_id: id }
    })
      .then(res => setBookedTimes(res.data.booked_times))
      .catch(err => console.error("Error fetching booked slots:", err));
  }, [date, id]);

  const handleBooking = async () => {
    if (!userName || !userEmail || !time) {
      setMessage(t.fillAll);
      return;
    }

    if (!date) {
      setMessage(t.selectDate); // Add a string like "Please select a date"
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
      setMessage(t.success);
    } catch (err) {
      setMessage(t.error);
    }
  };

  if (!advisor) return <div className="container my-5 text-center">{t.loading}</div>;

  return (
    <div className="advisor-detail-full">
      <div className="advisor-grid">
        <div className="advisor-image-section">
          <img
            src={advisor.photo_url.startsWith('http')
              ? advisor.photo_url
              : `http://127.0.0.1:5000${advisor.photo_url}`}
            alt={advisor.name}
            className="advisor-image"
          />
          <h3>{advisor.name}</h3>
          <p className="expertise">{advisor.expertise}</p>
        </div>

        <div className="advisor-content-section">
          <h4>{t.about}</h4>
          <p>{advisor.bio || t.noBio}</p>

          <h4 className="mt-4">{t.bookAppointment}</h4>
          <div className="booking-form">
            <input
              type="text"
              placeholder={t.namePlaceholder}
              className="form-input"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              className="form-input"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
            />
            <DatePicker
              selected={date}
              onChange={setDate}
              placeholderText={t.datePlaceholder || "Select your date"}
              dateFormat="yyyy-MM-dd"
              className="form-input"
            />
            <select
              className="form-input"
              value={time}
              onChange={e => setTime(e.target.value)}
            >
              <option value="">{t.selectTime}</option>
              {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"].map(slot => (
                <option key={slot} value={slot} disabled={bookedTimes.includes(slot)}>
                  {slot} {bookedTimes.includes(slot) ? "(Booked)" : ""}
                </option>
              ))}
            </select>

            <button className="btn-book" onClick={handleBooking}>
              {t.confirm}
            </button>

            {message && <p className="booking-message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvisorProfile;
