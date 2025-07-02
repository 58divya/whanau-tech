from extensions import db
from datetime import datetime, timezone

class User(db.Model):
    __tablename__ ='users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(128), nullable=False)

class Contact(db.Model):
    __tablename__ ='contact_records'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

class Booking(db.Model):
    __tablename__ ='bookings'
    id = db.Column(db.Integer, primary_key=True)
    advisor_id = db.Column(db.Integer, nullable=False)
    advisor_name = db.Column(db.String(100), nullable=False)
    user_name = db.Column(db.String(100), nullable=False)
    user_email = db.Column(db.String(120), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    date = db.Column(db.String, nullable=False)  # 'YYYY-MM-DD'
    time = db.Column(db.String, nullable=False)  # 'HH:MM'