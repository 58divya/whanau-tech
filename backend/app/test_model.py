from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch

model_path = "./chatbot-t5"
tokenizer = T5Tokenizer.from_pretrained(model_path)
model = T5ForConditionalGeneration.from_pretrained(model_path)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

input_text = "question: Where is the location?"  # Try English question first
input_ids = tokenizer.encode(input_text, return_tensors="pt").to(device)

print("Decoded input tokens:", tokenizer.decode(input_ids[0]))

output_ids = model.generate(
    input_ids,
    max_length=150,
    num_beams=4,
    early_stopping=True
)

reply = tokenizer.decode(output_ids[0], skip_special_tokens=True)
print("Model reply:", reply)


