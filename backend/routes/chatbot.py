# from flask import Blueprint, request, jsonify
# from openai import OpenAI
# import os

# chatbot_bp = Blueprint('chatbot', __name__, url_prefix='/api')

# client = OpenAI()

# @chatbot_bp.route('/chat', methods=['POST'])
# def chat():
#     try:
#         data = request.get_json()
#         user_message = data.get('message', '').strip()
#         if not user_message:
#             return jsonify({'error': 'No message provided'}), 400

#         response = client.chat.completions.create(
#             model="gpt-4o",
#             messages=[
#                 {"role": "system", "content": (
#                     "You are Matua Tohu, a respectful and caring Māori tech advisor from WhānauTech. "
#                     "You greet users in te reo Māori, explain things patiently, and always guide whānau "
#                     "in a culturally appropriate and warm manner. Use gentle language. Prioritise helping Māori whānau understand technology. "
#                     "Avoid slang. Finish with 'Ngā mihi' or similar."
#                 )},
#                 {"role": "user", "content": user_message}
#             ],
#             max_tokens=200
#         )
#         reply_text = response.choices[0].message.content.strip()
#         return jsonify({'reply': reply_text})
#     except Exception as e:
#         print("❌ Chat error:", e)
#         return jsonify({'error': 'Sorry, I had trouble responding.'}), 500