from flask import Blueprint, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os

news_bp = Blueprint('news_bp', __name__, url_prefix='/api/news')
load_dotenv()

# Set your OpenAI API key
client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    api_key = os.getenv('OPENAI_API_KEY')
)

@news_bp.route('/', methods=['GET'])
def get_news():
    # Mock headlines
    headlines = [
        "Stock Market Reaches All-Time High",
        "Federal Reserve Considers Interest Rate Cut",
        "Tech Companies Report Record Earnings"
    ]
    # Generate summary using OpenAI
    prompt = "Summarize the following financial news headlines:\n" + "\n".join(headlines)
    # Simple prompt for OpenAI API
    system_content = 'You are a summarizer AI, summarizing financial news headlines.'
    messages = [{'role': 'system', 'content': system_content.strip()}]
    # messages.append({'role': 'assistant', 'content': f"input user specific data"})
    messages.append({'role': 'user', 'content': prompt.strip()})
    response = client.chat.completions.create(
        model='gpt-3.5-turbo',
        messages=messages,
        max_tokens=150,
        stream=False
    )
    summary = response.choices[0].message.content.strip()
    return jsonify({'summary': summary})
