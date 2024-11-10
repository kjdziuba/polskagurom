from flask import Blueprint, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os
import pandas as pd
import requests

news_bp = Blueprint('news_bp', __name__, url_prefix='/api/news')
load_dotenv()

# Set your OpenAI API key
client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    api_key = os.getenv('OPENAI_API_KEY')
)

# Load stock data
stock_df = pd.read_json('./data/normal/stock.json')

# Transpose if necessary
if '0' in stock_df.columns:
    stock_df = stock_df.transpose()

# Get the latest date
latest_date = stock_df["('Quantity', 'Date')"].max()

# Filter data for the latest date
latest_data = stock_df[stock_df["('Quantity', 'Date')"] == latest_date]


# Extract stock quantities
stocks = [col.split(", ")[1].strip("()'") for col in stock_df.columns if col.startswith("('Quantity',") and col != "('Quantity', 'Date')"]

print("Stocks:", stocks)

holdings = stocks

def fetch_news_articles(api_key, stock_symbols):
    all_articles = []
    for symbol in stock_symbols:
        url = f'https://newsapi.org/v2/everything?q={symbol}&apiKey={api_key}'
        response = requests.get(url)
        data = response.json()
        if data['status'] == 'ok':
            articles = data['articles']
            for article in articles:
                all_articles.append({
                    'symbol': symbol,
                    'title': article['title'],
                    'description': article['description'],
                    'url': article['url'],
                    'publishedAt': article['publishedAt']
                })
    return all_articles
# Example usage
api_key = '2052ac1f98934262b6b63f0cb3c7ff2b'
stock_symbols = holdings

@news_bp.route('/', methods=['GET'])
def get_news():
    news_articles = fetch_news_articles(api_key, stock_symbols)
    headlines = [article['title'] for article in news_articles]
    # print("News Articles:", news_articles)

    # Generate summary using OpenAI
    prompt = f"Pick up the most relevant headlines to these companies: {stock_symbols}:\n" + "\n".join(headlines)
    # Simple prompt for OpenAI API
    system_content = '''
    You are a summarizer AI, summarizing financial news headlines. 
    Keep the summary concise and relevant to the companies mentioned in the headlines. 
    Make sure to have it in the format:
    "Company: Headline summary\nCompany: Headline summary\nCompany: Headline summary"
    '''
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
