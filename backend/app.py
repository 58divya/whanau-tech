from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail, Message
from datetime import datetime, timezone
import os
import re


app = Flask(__name__)
CORS(app ,resources={r"/api/*": {"origins": "*"}})

bookings = []  # Store in memory for now

# Dummy advisor data for now
advisors = [
    {
    "id": 1,
            "name": "Mereana Raukawa",
            "photo_url": "https://via.placeholder.com/300x200",
            "expertise": "Cloud Solutions, Data Sovereignty"
        },
        {
            "id": 2,
            "name": "Wiremu Ngata",
            "photo_url": "https://via.placeholder.com/300x200",
            "expertise": "Cybersecurity & Infrastructure"
        },
        {
            "id": 3,
            "name": "Aroha Tuihana",
            "photo_url": "https://via.placeholder.com/300x200",
            "expertise": "Digital Literacy, Community Training"
        }
    ]


# Database setup
base_dir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(base_dir, 'mydatabase.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Mail config
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')

db = SQLAlchemy(app)
mail = Mail(app)

# Models
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    advisor_id = db.Column(db.Integer, nullable=False)
    advisor_name = db.Column(db.String(100), nullable=False)
    user_name = db.Column(db.String(100), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now(timezone.utc))

# Create tables
with app.app_context():
    db.create_all()

# Root route
@app.route('/')
def index():
    return "🚀 WhānauTech backend is running!"

# Getting the advisor data calling api
@app.route('/api/advisors', methods=['GET'])
def get_advisors():
    # Return advisor data here, e.g.:
    return jsonify(advisors)

# Booking appointment
@app.route('/api/book', methods=['POST'])
def book_appointment():
    data = request.get_json()
    advisor_id = data.get('advisor_id')
    advisor_name = data.get('advisor_name')
    user_name = data.get('user_name')

    if not advisor_id or not advisor_name or not user_name:
        return jsonify({"message": "Missing fields"}), 400

    try:
        booking = Booking(
            advisor_id=advisor_id,
            advisor_name=advisor_name,
            user_name=user_name
        )
        db.session.add(booking)
        db.session.commit()

        return jsonify({"message": f"Appointment booked with {advisor_name} for {user_name}."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Booking failed. Please try again later."}), 500

# Contact form endpoint
@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        # Input validation
        if not name or len(name) < 2:
            return jsonify({'error': 'Kaore i te tika te ingoa. Me 2+ pūāhua.'}), 400
        if not email or not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
            return jsonify({'error': 'Kaore i te tika te īmēra.'}), 400
        if not message or len(message) < 10:
            return jsonify({'error': 'Kaore i te tika te kōrero. Me 10+ pūāhua.'}), 400

        contact_entry = Contact(name=name, email=email, message=message)
        try:
            db.session.add(contact_entry)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': 'Database error: Whakamātau anō.'}), 500

        try:
            msg = Message(
                subject='New Contact Form Submission | WhānauTech',
                recipients=[os.environ.get('MAIL_USERNAME')],
                body=f'Name: {name}\nEmail: {email}\nMessage: {message}\nSubmitted: {datetime.now(timezone.utc)}'
            )
            mail.send(msg)
        except Exception as e:
            print(f"Email sending failed: {str(e)}")

        return jsonify({'message': 'Tukuna pai! Ka whakapā atu mātou ki a koe.'}), 200
    except Exception as e:
        return jsonify({'error': 'I hē te tukunga. Whakamātau anō ā muri ake.'}), 500

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))
    app.run(debug=False, host='0.0.0.0', port=port)

