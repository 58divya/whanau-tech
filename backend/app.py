from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail, Message
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Database setup
base_dir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(base_dir, 'mydatabase.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Mail config (optional)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
app.config['MAIL_PASSWORD'] = 'your-app-password'
app.config['MAIL_DEFAULT_SENDER'] = 'your-email@gmail.com'

db = SQLAlchemy(app)
mail = Mail(app)

# Models
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Create tables
with app.app_context():
    db.create_all()

# ✅ FIXED: Root route
@app.route('/')
def index():
    return "🚀 Whānau Tech backend is running!"

# Contact form endpoint
@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if not name or not email or not message:
            return jsonify({'error': 'Kaore i te tika te ingoa, īmēra, kōrero rānei. Whakakiia ngā wāhanga katoa.'}), 400

        contact_entry = Contact(name=name, email=email, message=message)
        db.session.add(contact_entry)
        db.session.commit()

        try:
            msg = Message(
                subject='New Contact Form Submission | Tūhono Tech',
                recipients=['your-email@gmail.com'],
                body=f'Name: {name}\nEmail: {email}\nMessage: {message}\nSubmitted: {datetime.utcnow()}'
            )
            mail.send(msg)
        except Exception as e:
            print(f"Email sending failed: {str(e)}")

        return jsonify({'message': 'Tukuna pai! Ka whakapā atu mātou ki a koe.'}), 200
    except Exception as e:
        return jsonify({'error': 'I hē te tukunga. Whakamātau anō ā muri ake.'}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # 👈 This allows Render to assign the port
    app.run(debug=False, host='0.0.0.0', port=port)