from flask import Flask, send_from_directory
from flask_cors import CORS
import os

from .extensions import db, mail, jwt
from .routes.contact import contact_bp
from .routes.advisors import advisors_bp
from .routes.chatbot import chatbot_bp


def create_app():
    app = Flask(
    __name__,
    static_folder=os.path.join(os.path.dirname(__file__), 'build'),
    static_url_path='/'
    )

    # Config
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key'
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

    # CORS (adjust for production as needed)
#     CORS(app, resources={
#     r"/api/*": {
#         "origins": [
#             "http://localhost:3000", 
#             "https://whanau-tech.onrender.com"
#         ]
#     },
#     r"/static/*": {
#         "origins": [
#             "http://localhost:3000", 
#             "https://whanau-tech.onrender.com"
#         ]
#     }
# }, supports_credentials=True)
    CORS(app, resources={
    r"/api/*": {"origins": "*"},
    r"/static/*": {"origins": "*"}
})

    # Init extensions
    db.init_app(app)
    mail.init_app(app)
    jwt.init_app(app)

    # Register blueprints
    app.register_blueprint(contact_bp)
    app.register_blueprint(advisors_bp)
    app.register_blueprint(chatbot_bp)

    with app.app_context():
        db.create_all()
    
    # ✅ Route to serve static images correctly
    @app.route('/static/images/<path:filename>')
    def serve_image(filename):
        image_dir = os.path.join(app.root_path, 'static', 'images')
        return send_from_directory(image_dir, filename)

    # 👇 Serve React static files or index.html fallback for SPA
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_react(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, "index.html")

    # Optional: quick test endpoint
    @app.route("/test")
    def test():
        return "Test route is working!"

    return app


# Entry point
app = create_app()

if __name__ == "__main__":
    print("Starting Flask app...")
    app.run(debug=True)
