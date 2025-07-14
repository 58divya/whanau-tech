from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os
from .extensions import db, mail, jwt

# Import your extensions and blueprints here
from .extensions import db, mail, jwt
from .routes.contact import contact_bp
from .routes.advisors import advisors_bp
from .routes.chatbot import chatbot_bp


def create_app():
    app = Flask(__name__, static_folder='build', static_url_path='/')

    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key'
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

    CORS(
        app,
        resources={
            r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]},
            r"/static/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]},
        },
        supports_credentials=True,
    )

    db.init_app(app)
    mail.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(contact_bp)
    app.register_blueprint(advisors_bp)
    app.register_blueprint(chatbot_bp)

    with app.app_context():
        db.create_all()

    # Serve backend static images
    @app.route('/static/images/<path:filename>')
    def serve_backend_images(filename):
        return send_from_directory(os.path.join(app.root_path, 'static', 'images'), filename)

    # Serve React build files and SPA fallback
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_react(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, "index.html")

    @app.route("/test")
    def test():
        return "Test route is working!"

    return app



app = create_app()

if __name__ == "__main__":
    print("Starting Flask app...")
    app.run(debug=True)
