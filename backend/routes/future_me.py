# backend/routes/future_me.py

from flask import Blueprint, request, jsonify
import os
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

future_me_bp = Blueprint('future_me_bp', __name__, url_prefix='/api/future-me')

# Set your OpenAI API key
client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    api_key = os.getenv('OPENAI_API_KEY')
)

@future_me_bp.route('/', methods=['POST'])
def future_me():
    data = request.get_json()
    user_message = data.get('message', '')

    # Simple prompt for OpenAI API
    system_content = 'You are Future Me, an AI assistant giving financial advice.'
    messages = [{'role': 'system', 'content': system_content.strip()}]
    # messages.append({'role': 'assistant', 'content': f"input user specific data"})
    messages.append({'role': 'user', 'content': user_message.strip()})

    response = client.chat.completions.create(
        model='gpt-3.5-turbo',
        messages=messages,
        max_tokens=150,
        stream=False
    )

    answer = response.choices[0].message.content.strip()
    return jsonify({'response': answer})
