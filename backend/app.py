from flask import Flask, jsonify
from extensions import db, mail, jwt  
from routes.contact import contact_bp 
from routes.advisors import advisors_bp
from routes.chatbot import chatbot_bp
from flask_cors import CORS
import os

def create_app():
    app = Flask(__name__, static_folder='static')

    base_dir = os.path.abspath(os.path.dirname(__file__))  # backend folder
    db_path = os.path.join(base_dir, 'instance', 'users.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
    print("DB path in use:", db_path)

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key'
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

    # Allow React frontend origins to access /api/*
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}}, supports_credentials=True)

    db.init_app(app)
    mail.init_app(app)
    jwt.init_app(app)

    # Register blueprints
    #Blueprint for contact form
    app.register_blueprint(contact_bp)
    print("Registered contact_bp")

    #Blueprint for advisors
    app.register_blueprint(advisors_bp)
    print("Registered advisors_bp")

    #Blueprint for chatbot
    app.register_blueprint(chatbot_bp)
    print("Registered chatbot_bp")

    with app.app_context():
        db.create_all()
        print("Database tables created")

    # @app.route('/')
    # def home():
    #     return jsonify(message="Welcome to WhānauTech backend!")

    # Simple test route to verify server works
    @app.route('/test')
    def test():
        print("GET /test called")
        return "Test route is working!"

    return app


if __name__ == '__main__':
    app = create_app()
    print("Starting Flask app...")
    app.run(debug=True)