# WhānauTech - Tech Consultancy Web Application

**WhānauTech** is a modern web-based application that aims to support Māori communities by providing **technology consultation services**, **digital education**, and **IT guidance**. It features a friendly user interface, a bilingual chatbot, and a secure backend.

## 🛠️ Tech Stack

### Frontend
- **React.js** (with Hooks)
- Bootstrap CSS (or your preferred styling library)
- AOS (for scroll animations)
- Responsive design (mobile & desktop)
- React Router
- Form validation & dynamic feedback
### Backend
- Flask (Python)
- SQLAlchemy (ORM)
- Flask-Mail (Email sending)
- Flask-CORS (Cross-Origin Resource Sharing)
- Flask-JWT-Extended (JWT-based auth)
- SQLite (Dev DB) or PostgreSQL (Production)

### Chatbot & AI
- OpenAI API for intent recognition and response generation
- Supports both English 
- Dynamic assistant hand-off to book appointment for complex queries

### Additional Features
-  **Interactive Chatbot**
-  **Advisor Booking System**
-  **Email Confirmation for Consultations**
-  **Smart Calendar Integration** 
-  **Dark Mode Supoort**

## 📦 Project Structure
whanautech/
├── backend/ # Flask backend
│ ├── app.py
│ ├── models/
│ ├── routes/
│ ├── templates/
│ └── static/
├── my_app/ # React frontend
│ ├── public/
│ └── src/
│ |├── components/
| |├── picture/ # Static images (e.g., testimonials, advisor photos)
└── README.md

## Setup Instructions
### 🚀 Getting Started

### 1. Clone the Repository
git clone https://github.com/58divya/whanautech.git

cd whanautech

### 2. Backend Setup (Flask)
cd backend

python3 -m venv venv

source venv/bin/activate  # On Windows use `venv\Scripts\activate`

pip install -r requirements.txt

### Create .env file:
REACT_APP_API_URL=http://127.0.0.1:5000

GENERATE_SOURCEMAP=false

MAIL_USERNAME=your-real-gmail@gmail.com

MAIL_PASSWORD=your-app-password

MAIL_DEFAULT_SENDER=your-real-gmail@gmail.com

TOGETHER_API_KEY="50613d85826ffb37f14653c49164d8f54639b0f16cf5fe39c99b5ae31fbc9b94"

### Run the backend:
flask run

### 3. Frontend Setup (React)
cd frontend
npm install
npm start

## Chatbot Functionality
- Built with OpenAI’s GPT models.

- Supports basic queries like:
    - “How can I secure my Wi-Fi?”
    - “How do I set up cloud backup?”
    - “How do I build a website?”

- For advanced tech help, the chatbot guides users to book a session with advisors.

- Supports Māori language with intent recognition and polite greeting/closing messages.

## Testing 
To run tests for the backend (optional):
pytest

Frontend testing (if using):
npm test

## Deployment
You can deploy this app using:
* Frontend: Vercel, Netlify, or GitHub Pages
* Backend: Render, Heroku, Railway, or your own VPS

For production, make sure to:
* Use environment variables for secrets
* Configure CORS and HTTPS
* Replace SQLite with PostgreSQL or another production-grade DB

## Future Enhancements
* Google Calendar Integration for advisor slots
* SMS notifications for confirmed bookings
* Multi-role access: Admin, Advisor, User
* Dashboard analytics & user insights

## Contributing
1. We welcome contributions!
2. Fork the repository
3. Create your feature branch (git checkout -b feature/your-feature)
4. Commit your changes (git commit -am 'Add new feature')
5. Push to the branch (git push origin feature/your-feature)
6. Open a Pull Request

## Licensing
This project is licensed under the MIT License.
© 2025 WhānauTech

## Acknowledgements
* Together AI – for the powerful GPT models
* Flask & React – for full-stack capability
* Community – whānau who helped shape this vision

## Contact
Email: hello@whanautech.org
Website: www.whanautech.org