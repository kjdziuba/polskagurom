from flask import Blueprint, jsonify
import datetime
import requests
from openai import OpenAI
from dotenv import load_dotenv
import os
import pandas as pd
import yfinance as yf

notifications_bp = Blueprint('notifications_bp', __name__, url_prefix='/api/notifications')
load_dotenv()

# Set your OpenAI API key
client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    api_key = os.getenv('OPENAI_API_KEY')
)


def get_user_holdings(stock_json_path):
    # For demonstration, using hardcoded holdings
    return {
        'AAPL': 10,
        'GOOGL': 5,
        'AMZN': 2,
        'AMD': 15,
        'TSLA': 3,
        'KO': 20,
        'BAC': 25
    }

def fetch_current_prices(stock_symbols):
    prices = {}
    for symbol in stock_symbols:
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period='1d')
        if not hist.empty:
            price = hist['Close'].iloc[-1]
            prices[symbol] = price
    return prices

def fetch_previous_closing_prices(stock_symbols):
    previous_prices = {}
    for symbol in stock_symbols:
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period='5d')
        if len(hist) >= 2:
            previous_close = hist['Close'].iloc[-2]
            previous_prices[symbol] = previous_close
    return previous_prices

def detect_significant_changes(current_prices, previous_prices, threshold=5):
    significant_events = []
    for symbol in current_prices:
        if symbol in previous_prices:
            old_price = previous_prices[symbol]
            new_price = current_prices[symbol]
            change_percent = ((new_price - old_price) / old_price) * 100
            if abs(change_percent) >= threshold:
                significant_events.append({
                    'symbol': symbol,
                    'old_price': old_price,
                    'new_price': new_price,
                    'change_percent': change_percent
                })
    return significant_events

def generate_notification(event):
    prompt = f"""
        Create a personalized notification for a user about their stock holdings.

        Stock: {event['symbol']}
        Previous Price: ${event['old_price']:.2f}
        Current Price: ${event['new_price']:.2f}
        Change: {event['change_percent']:.2f}%

        The message should be friendly and informative.
        """

    messages = [
        {'role': 'system', 'content': 'Provide a personalized notification for a user about their stock holdings.'},
        {'role': 'user', 'content': prompt.strip()}
    ]

    response = client.chat.completions.create(
        model='gpt-3.5-turbo',
        messages=messages,
        max_tokens=150,
        stream=False
    )
    message = response.choices[0].message.content.strip()
    return message

def generate_notifications(significant_events):
    notifications = []
    for event in significant_events:
        message = generate_notification(event)
        notifications.append({
            'symbol': event['symbol'],
            'message': message,
            'timestamp': datetime.datetime.now().isoformat(),
            'significant': True  # All events here are significant
        })
    return notifications

@notifications_bp.route('/', methods=['GET'])
def get_notifications():
    # Load user's holdings
    stock_json_path = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'normal', 'stock.json')
    holdings = get_user_holdings(stock_json_path)
    stock_symbols = list(holdings.keys())

    # Fetch current and previous prices using yfinance
    current_prices = fetch_current_prices(stock_symbols)
    previous_prices = fetch_previous_closing_prices(stock_symbols)

    # Detect significant events
    significant_events = detect_significant_changes(current_prices, previous_prices)

    # Generate notifications
    notifications = generate_notifications(significant_events)

    print("Notifications:", notifications)

    return jsonify(notifications)
