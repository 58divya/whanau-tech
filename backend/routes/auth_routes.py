from flask import Blueprint, request, jsonify
from extensions import db
from models.models import User  # adjust import to your project structure
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import SQLAlchemyError
from .utils import is_valid_email, is_strong_password  # import utils if separate file
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token
from datetime import datetime

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

@auth_bp.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'CORS preflight success'}), 200

    try:
        data = request.get_json()
        print("Register request data:", data)

        dob_str = data.get('dob')  # '2025-07-09'
        dob = datetime.strptime(dob_str, '%Y-%m-%d').date()

        hashed_password = generate_password_hash(data['password'])

        user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            dob=dob,  # now a proper date
            email=data['email'],
            password=hashed_password,
            phone=data['phone']
        )

        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully'}), 201

    except Exception as e:
        print("❌ Error in register route:", e)
        db.session.rollback()
        return jsonify({'message': 'Internal server error'}), 500

@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200

    try:
        data = request.get_json()
        print("Incoming login data:", data)

        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'message': 'Email and password required'}), 400

        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password, password):
            return jsonify({'message': 'Invalid email or password'}), 401

        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token}), 200
    except Exception as e:
        print("❌ ERROR:", e)
        return jsonify({'message': 'Internal server error'}), 500