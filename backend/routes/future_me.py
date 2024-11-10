# backend/routes/future_me.py
from flask import Blueprint, request, jsonify, Response, stream_with_context
import os
from openai import OpenAI
from dotenv import load_dotenv
import json
from data_analysis.calculate_spending import create_spending_df

load_dotenv()

future_me_bp = Blueprint('future_me_bp', __name__, url_prefix='/api/future-me')

# Set your OpenAI API key
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

@future_me_bp.route('/', methods=['POST'])
def future_me():
    user_goals = {
        'short_term_goals': ['Build an emergency fund of $5,000'],
        'long_term_goals': ['Save for a down payment on a house', 'Retire by age 60']
    }
    data = request.get_json()
    user_message = data.get('message', '')

    # Load your JSON files
    try:
        spending_json = json.load(open('data/normal/spending.json'))
        spending_json_str = json.dumps(spending_json)
        net_worth_json = json.load(open('data/normal/net_worth.json'))
        net_worth_json_str = json.dumps(net_worth_json)
    except Exception as e:
        return jsonify({'error': f"Failed to load JSON file: {str(e)}"}), 500

    # Simple prompt for OpenAI API
    system_content = '''
    You are the Future Me. You are the user but from the the future an AI financial assistant helping the user achieve their financial goals. 
    You have access to my spending data and my assests data and can provide advice based on that. 
    You should provide brief insights without too much talking and use lots of markdown formatting to make it easier to read. 
    You should also provide clear predictions.
    - Analyze the user's spending patterns.
    - Identify areas where they can adjust spending to meet their goals.
    - Use empathetic and encouraging language.
    - Format your response in markdown for better readability, including bullet points and headings.
    -be concise and to the point
    -act as the user from the future, be him but with more knowledge and experience
    '''
    messages = [{'role': 'system', 'content': system_content.strip()}]
    # Append the JSON content and user message
    messages.append({'role': 'system', 'content': f"Here is my spending data, which you should base all your answers on: {spending_json_str}"})
    messages.append({'role': 'system', 'content': f"Here is my net worth data, which you should also base all your answers on: {net_worth_json_str}"})
    messages.append({'role': 'system', 'content': f"Here are my goals: {user_goals}"})
    messages.append({'role': 'user', 'content': "Here is my question to you:" + user_message.strip()})

    response = client.chat.completions.create(
        model='gpt-4o',
        messages=messages,
        max_tokens=1000,
        stream=True
    )

    def generate():
        assistant_reply = ""
        for chunk in response:
            chunk_message = chunk.choices[0].delta.content
            if chunk_message is not None:
                assistant_reply += chunk_message
                print(chunk_message)
                yield f"{chunk_message}"
    
    return Response(stream_with_context(generate()), mimetype='text/plain')
