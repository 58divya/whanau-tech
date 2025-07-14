from flask import Flask, jsonify, send_from_directory
from .extensions import db, mail, jwt  
from .routes.contact import contact_bp 
from .routes.advisors import advisors_bp
from .routes.chatbot import chatbot_bp
from flask_cors import CORS
import os

def create_app():
    # 👇 Change static_folder from 'static' to 'build'
    app = Flask(__name__, static_folder='build', static_url_path='/')

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key'
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}}, supports_credentials=True)

    db.init_app(app)
    mail.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(contact_bp)
    app.register_blueprint(advisors_bp)
    app.register_blueprint(chatbot_bp)

    with app.app_context():
        db.create_all()

    # 👇 Serve React index.html for the root route
    @app.route('/')
    def serve_react():
        return send_from_directory(app.static_folder, 'index.html')

    # 👇 Catch-all route to serve React for any unknown path
    @app.errorhandler(404)
    def not_found(e):
        return send_from_directory(app.static_folder, 'index.html')

    # API test route
    @app.route('/test')
    def test():
        return "Test route is working!"

    return app

app = create_app()

if __name__ == '__main__':
    print("Starting Flask app...")
    app.run(debug=True)
