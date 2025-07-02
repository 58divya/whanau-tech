// src/components/AdvisorSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";

function AdvisorSection() {
  const [advisors, setAdvisors] = useState([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [bookedTimes, setBookedTimes] = useState([]);

// For booked slots 
  useEffect(() => {
  if (!selectedAdvisor || !selectedDate) {
    setBookedTimes([]);
    return;
  }

  const dateStr = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD

  fetch(`http://localhost:5000/api/booked_slots?date=${dateStr}&advisor_id=${selectedAdvisor.id}`)
    .then(res => res.json())
    .then(data => {
      if (data.booked_times) {
        setBookedTimes(data.booked_times);
      } else {
        setBookedTimes([]);
      }
    })
    .catch(() => setBookedTimes([]));
}, [selectedAdvisor, selectedDate]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/advisors')
      .then(res => setAdvisors(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBook = (advisor) => {
  if (userName && userEmail) {
    fetch('http://localhost:5000/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        advisor_id: advisor.id,
        advisor_name: advisor.name,
        user_name: userName,
        user_email: userEmail,
        datetime: selectedDate.toISOString(),
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
        } else {
          alert("Booking failed: " + (data.error || "Unknown error"));
        }
      })
      .catch(err => alert("Error: " + err.message));
  } else {
    alert("Please provide both name and email.");
  }
};

const filterPassedTime = (time) => {
  // Format time as 'HH:mm'
  const timeStr = time.toTimeString().slice(0, 5);
  return !bookedTimes.includes(timeStr);
};

  return (
    <section id="advisors" className="py-5 bg-white">
      <div className="container">
        <h2 className="text-center mb-4">Ngā Kaitohutohu</h2>
        <div className="row">
          {advisors.map(advisor => (
            <div className="col-md-4 mb-4" key={advisor.id}>
              <div className="card h-100 text-center shadow-sm">
                <img
                  src={advisor.photo_url}
                  alt={advisor.name}
                  className="card-img-top"
                  style={{ height: '220px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{advisor.name}</h5>
                  <p className="card-text">{advisor.expertise}</p>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => setSelectedAdvisor(advisor)}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedAdvisor && (
          <div className="mt-5 p-4 border rounded bg-light">
            <h4>Book with {selectedAdvisor.name}</h4>

            <input
              type="text"
              placeholder="Your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="form-control mb-2"
            />

            <input
              type="email"
              placeholder="Your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="form-control mb-2"
            />

            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="form-control mb-2"
              filterTime={filterPassedTime}
            />

            <button
              className="btn btn-success me-2"
              onClick={() => handleBook(selectedAdvisor)}
            >
              Confirm Booking
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setSelectedAdvisor(null)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
export default AdvisorSection;