import os
from flask import Flask, send_from_directory
from flask_cors import CORS

from extensions import db, mail, jwt
from app.contact import contact_bp
from app.advisors import advisors_bp
from app.chatbot import chatbot_bp



def create_app():
    # Path to React build folder relative to this file
    frontend_path = os.path.join(os.path.dirname(__file__), '..', 'build')

    print("Frontend path:", frontend_path)
    print("Index exists:", os.path.exists(os.path.join(frontend_path, "index.html")))

    app = Flask(
        __name__,
        static_folder=frontend_path,
        static_url_path='/'
    )

    print("Flask root_path:", app.root_path)


    # Flask app config
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "your_secret_key")
    app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "your_jwt_secret_key")

    # CORS configuration (adjust origins as needed)
    CORS(app, resources={
        r"/api/*": {"origins": ["http://localhost:3000", "https://whanau-tech.onrender.com"]},
        r"/static/*": {"origins": ["http://localhost:3000", "https://whanau-tech.onrender.com"]}
    }, supports_credentials=True)

    # Initialize extensions
    db.init_app(app)
    mail.init_app(app)
    jwt.init_app(app)

    # Register blueprints
    app.register_blueprint(contact_bp)
    app.register_blueprint(advisors_bp)
    app.register_blueprint(chatbot_bp)

    # Create database tables
    with app.app_context():
        db.create_all()

    # Serve static images from /static/images
    @app.route('/static/images/<path:filename>')
    def serve_image(filename):
        # app.root_path is backend/app, so go one level up to backend
        base_dir = os.path.abspath(os.path.join(app.root_path, '..'))  # backend folder
        image_dir = os.path.join(base_dir, 'static', 'images')
        print("Serving image from:", image_dir)
        return send_from_directory(image_dir, filename)


    # Serve React frontend for all other routes (SPA support)
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_react(path):
        if path != '' and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, 'index.html')

    # Optional test route
    @app.route('/test')
    def test():
        return 'Test route is working!'

    return app
