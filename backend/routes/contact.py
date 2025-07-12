""" ------------Contact form endpoint----------------- """

from flask import Blueprint, request, jsonify
from extensions import db, mail
from models.models import Contact
from flask_mail import Message
from datetime import datetime, timezone
import os
import re

contact_bp = Blueprint('contact', __name__, url_prefix='/api/contact')

@contact_bp.route('', methods=['POST'])
def handle_contact_form():
    data = request.get_json()
    print("Received JSON data:", data)

    if not data:
        return jsonify({"error": "No data provided or invalid JSON."}), 400

    try:
        # Extract fields safely
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')

        # Validate required fields
        if not all([name, email, subject, message]):
            return jsonify({"error": "All fields (name, email, subject, message) are required."}), 400

        # ✅ Save to database
        new_contact = Contact(
            name=name,
            email=email,
            subject=subject,
            message=message,
            created_at=datetime.now(timezone.utc)
        )
        db.session.add(new_contact)
        db.session.commit()
        print("Contact saved to database")

        # ✅ Optional: send email to admin
        msg = Message(
            subject=f"New contact from {name}",
            sender=email,
            recipients=['your-admin-email@gmail.com'],  # change to your admin email
            body=f"From: {name} <{email}>\nSubject: {subject}\n\nMessage:\n{message}"
        )
        try:
            mail.send(msg)
            print("Email sent to admin.")
        except Exception as mail_error:
            print("Email sending failed:", mail_error)

        return jsonify({"message": "Form submitted and saved!"}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Failed to process the form."}), 500