# advisors.py (Flask Blueprint for Advisor Listing and Booking)

from flask import Blueprint, jsonify, request
from extensions import db, mail
from models.models import Booking
from dateutil import parser
from flask_mail import Message


advisors_bp = Blueprint('advisors', __name__, url_prefix='/api')

# Static advisor list
advisors = [
    {
        "id": 1,
        "name": "Bijeta Niraula",
        "photo_url": "https://via.placeholder.com/300x200",
        "expertise": "Cybersecurity & Infrastructure"
    },
    {
        "id": 2,
        "name": "Diksha Sharma",
        "photo_url": "https://via.placeholder.com/300x200",
        "expertise": "Digital Literacy, Community Training"
    },
    {
        "id": 3,
        "name": "Bhawana Joshi",
        "photo_url": "/static/pictures/vau.jpg",
        "expertise": "Digital Literacy, Community Training"
    },
    {
        "id": 4,
        "name": "Prajwol Lamichhane",
        "photo_url": "https://via.placeholder.com/300x200",
        "expertise": "Digital Literacy, Community Training"
    },
    {
        "id": 5,
        "name": "Utsav Mudbhari",
        "photo_url": "https://via.placeholder.com/300x200",
        "expertise": "Digital Literacy, Community Training"
    },
    {
        "id": 6,
        "name": "Urja Mudbari",
        "photo_url": "https://via.placeholder.com/300x200",
        "expertise": "Digital Literacy, Community Training"
    }
]

# Endpoint: Get advisor list
@advisors_bp.route('/advisors', methods=['GET'])
def get_advisors():
    print("GET /api/advisors called")
    return jsonify(advisors)

# Endpoint: Book an appointment
@advisors_bp.route('/book', methods=['POST'])
def book_appointment():
    data = request.get_json()
    advisor_id = data.get('advisor_id')
    advisor_name = data.get('advisor_name')
    user_name = data.get('user_name')
    user_email = data.get('user_email')
    dt_str = data.get('datetime')

    if not all([advisor_id, advisor_name, user_name, user_email, dt_str]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        dt = parser.parse(dt_str)
        new_booking = Booking(
            advisor_id=advisor_id,
            advisor_name=advisor_name,
            user_name=user_name,
            user_email=user_email,
            datetime=dt,
            date=dt.strftime('%Y-%m-%d'),
            time=dt.strftime('%H:%M')
        )
        db.session.add(new_booking)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Database error. Please try again later."}), 500

    # Send confirmation email
    try:
        msg = Message(
            subject='WhānauTech Appointment Confirmation',
            recipients=[user_email],
            body=f"""
Kia ora {user_name},

Thank you for booking a tech consultation with WhānauTech.

🗓️ Appointment Details:
Advisor: {advisor_name}
Date & Time: {dt.strftime('%A %d %B %Y at %I:%M %p')}

If you have any questions, feel free to reply to this email.

Ngā mihi nui,  
The WhānauTech Team
"""
        )
        mail.send(msg)
    except Exception as e:
        print(f"Failed to send email: {str(e)}")

    return jsonify({"message": f"Appointment booked with {advisor_name} for {user_name}."}), 200

# Endpoint: Get booked times for specific advisor/date
@advisors_bp.route('/booked_slots', methods=['GET'])
def get_booked_slots():
    date = request.args.get('date')
    advisor_id = request.args.get('advisor_id', type=int)

    if not date or not advisor_id:
        return jsonify({'error': 'Date and advisor_id parameters are required'}), 400

    bookings = Booking.query.filter_by(date=date, advisor_id=advisor_id).all()
    booked_times = [booking.time for booking in bookings]

    return jsonify({'booked_times': booked_times})
