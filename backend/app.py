from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, mail, jwt
from routes.auth import auth_bp
from routes.advisors import advisors_bp
from routes.contact import contact_bp
# from routes.chatbot import chatbot_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Initialize extensions
    db.init_app(app)
    mail.init_app(app)
    jwt.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(advisors_bp)
    app.register_blueprint(contact_bp)
    # app.register_blueprint(chatbot_bp)

    # Root route
    @app.route('/')
    def index():
        return "🚀 WhānauTech backend is running!"

    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5001))
    app = create_app()
    app.run(host='0.0.0.0', port=port, debug=False)