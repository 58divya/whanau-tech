from flask import Flask, request, jsonify
from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch

# Initialize Flask app
app = Flask(__name__)

# Load your fine-tuned model and tokenizer
model_path = "./chatbot-t5"  # Replace with the correct path if needed
tokenizer = T5Tokenizer.from_pretrained(model_path)
model = T5ForConditionalGeneration.from_pretrained(model_path)

# Device setup (optional - for faster inference with GPU)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    if not message.strip():
        return jsonify({"reply": "Please type a question."})

    input_text = "question: " + message
    input_ids = tokenizer.encode(input_text, return_tensors="pt", truncation=True, max_length=128).to(device)

    output_ids = model.generate(
        input_ids,
        max_length=128,
        num_beams=4,
        early_stopping=True
    )
    reply = tokenizer.decode(output_ids[0], skip_special_tokens=True)

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)