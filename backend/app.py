from flask import Flask, jsonify
from extensions import db, mail, jwt
from routes.auth_routes import auth_bp  
from routes.contact import contact_bp 
from flask_cors import CORS
from flask_jwt_extended import JWTManager


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key'
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # important for JWT

    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}}, supports_credentials=True)

    db.init_app(app)
    mail.init_app(app)
    jwt.init_app(app)  # initialize the JWTManager instance imported from extensions

    app.register_blueprint(auth_bp)
    app.register_blueprint(contact_bp)  

    def test_cors():
        return {"message": "CORS is working!"}
    


    with app.app_context():
        db.create_all()

    @app.route('/')
    def home():
        return jsonify(message="Welcome to WhānauTech backend!")
    


    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)