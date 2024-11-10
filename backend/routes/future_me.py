# backend/routes/future_me.py

from flask import Blueprint, request, jsonify
import os
from openai import OpenAI
from dotenv import load_dotenv
import os
import json
import pandas as pd
from data_analysis.calculate_spending import create_spending_df

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

    # Load your JSON file
    try:
        spending_df = create_spending_df()
        spending_json_str = spending_df.to_json(orient='records')
    except Exception as e:
        return jsonify({'error': f"Failed to load JSON file: {str(e)}"}), 500

    # Simple prompt for OpenAI API
    system_content = 'You are Future Me, an AI assistant giving financial advice. You have access to my spending data and can provide advice based on that.'
    messages = [{'role': 'system', 'content': system_content.strip()}]
    # Append the JSON content and user message
    messages.append({'role': 'system', 'content': f"Here is my spending data, which you should base your answer on: {spending_json_str}"})
    messages.append({'role': 'user', 'content': "Here is my question to you:" + user_message.strip()})

    response = client.chat.completions.create(
        model='gpt-3.5-turbo',
        messages=messages,
        max_tokens=150,
        stream=False
    )

    answer = response.choices[0].message.content.strip()
    return jsonify({'response': answer})
