from flask import Blueprint, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os
import pandas as pd
import requests
from datetime import datetime, timedelta

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

holdings = stocks

def fetch_news_articles(api_key, stock_symbols):
    all_articles = []
    # stock_symbols = {
    #     'AAPL': 10,
    #     'GOOGL': 5,
    #     'AMZN': 2,
    #     'AMD': 15,
    #     'TSLA': 3,
    #     'KO': 20,
    #     'BAC': 25
    # }
    for symbol in stock_symbols:
        url = f'https://newsapi.org/v2/everything?q={symbol}&apiKey={api_key}'
        # Calculate the date 7 days ago
        seven_days_ago = datetime.now() - timedelta(days=7)
        seven_days_ago_str = seven_days_ago.strftime('%Y-%m-%d')

        url = f'https://newsapi.org/v2/everything?q={symbol}&from={seven_days_ago_str}&apiKey={api_key}'
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

    all_articles = []

    all_articles.append({
        'symbol': 'AAPL',
        'title': "Apple Stock Price Levels to Watch as Buffett's Berkshire Continues Cutting Stake",
        'description': "Buffett's Berkshire Hathaway has continued to reduce its stake in Apple, impacting the stock price levels.",
        'url': "https://www.investopedia.com/apple-stock-price-levels-to-watch-berkshire-hathaway-continues-cutting-stake-warren-buffett-8738932?utm_source=chatgpt.com",
        'publishedAt': "2024-11-09"
    })

    all_articles.append({
        'symbol': 'AAPL',
        'title': "Nvidia Overtakes Apple as World's Most Valuable Company",
        'description': "Nvidia recently surpassed Apple as the world's most valuable company in the tech sector.",
        'url': "https://www.investopedia.com/nvidia-overtakes-apple-as-most-valuable-company-in-world-8731936?utm_source=chatgpt.com",
        'publishedAt': "2024-11-08"
    })

    all_articles.append({
        'symbol': 'AAPL',
        'title': "Apple and Amazon take bumper £200bn revenues in just three months after AI push",
        'description': "Both Apple and Amazon report record revenues, driven by advancements in AI.",
        'url': "https://www.thisismoney.co.uk/money/markets/article-14027209/Amazon-Apple-bumper-200bn-revenues-just-three-months-AI-push.html?mrn_rm=rta",
        'publishedAt': "2024-11-08"
    })

    all_articles.append({
        'symbol': 'GOOGL',
        'title': "Earnings Season Is In the Home Stretch. Here's What You Need to Know.",
        'description': "Earnings season wraps up with major insights on tech company performance, including Alphabet.",
        'url': "https://www.investopedia.com/earnings-season-home-stretch-what-you-need-to-know-8739193?utm_source=chatgpt.com",
        'publishedAt': "2024-11-07"
    })

    all_articles.append({
        'symbol': 'AMZN',
        'title': "Here's the big barrier Amazon stock must overcome to reach fresh highs",
        'description': "Amazon faces a key resistance level it must surpass to hit new stock highs.",
        'url': "https://www.marketwatch.com/story/heres-the-big-barrier-amazon-stock-must-overcome-to-reach-fresh-highs-c4e2f0fb?utm_source=chatgpt.com",
        'publishedAt': "2024-11-08"
    })

    all_articles.append({
        'symbol': 'AMZN',
        'title': "Amazon and Apple take bumper £200bn revenues in just three months after AI push",
        'description': "Both Amazon and Apple report record revenues, driven by advancements in AI.",
        'url': "https://www.thisismoney.co.uk/money/markets/article-14027209/Amazon-Apple-bumper-200bn-revenues-just-three-months-AI-push.html?mrn_rm=rta",
        'publishedAt': "2024-11-08"
    })

    all_articles.append({
        'symbol': 'AMD',
        'title': "AAPL, AMD, or AMZN: Which 'Strong Buy' Tech Stock Could Offer the Highest Upside?",
        'description': "Analysis of top tech stocks, including AMD, with insights into potential returns.",
        'url': "https://www.nasdaq.com/articles/aapl-amd-or-amzn%3A-which-strong-buy-tech-stock-could-offer-the-highest-upside",
        'publishedAt': "2024-11-08"
    })

    all_articles.append({
        'symbol': 'TSLA',
        'title': "Big Tech stocks rally, as tech now drives S&P 500 more than on Election Day 2016",
        'description': "Tesla among tech stocks fueling a significant S&P 500 rally.",
        'url': "https://www.marketwatch.com/story/big-tech-stocks-rally-as-tech-now-drives-s-p-500-more-than-on-election-day-2016-b2dd3dee?utm_source=chatgpt.com",
        'publishedAt': "2024-11-07"
    })

    all_articles.append({
        'symbol': 'KO',
        'title': "This stock market rotation is the 'lifeblood' of the bull market as S&P 500 logs record",
        'description': "Coca-Cola benefits from stock market rotation trends, reinforcing the bull market.",
        'url': "https://www.marketwatch.com/story/this-rotation-in-stocks-is-the-bull-markets-lifeblood-as-s-p-500-logs-record-peak-e9f11974?utm_source=chatgpt.com",
        'publishedAt': "2024-11-06"
    })

    all_articles.append({
        'symbol': 'BAC',
        'title': "Why Buffett's Berkshire Sold Apple Stock - Holds $352 Billion In Cash",
        'description': "Insight into Berkshire Hathaway's recent decision to sell Apple shares.",
        'url': "https://www.investopedia.com/apple-stock-price-levels-to-watch-berkshire-hathaway-continues-cutting-stake-warren-buffett-8738932?utm_source=chatgpt.com",
        'publishedAt': "2024-11-09"
    })

    return all_articles
# Example usage
api_key = '2052ac1f98934262b6b63f0cb3c7ff2b'
stock_symbols = holdings

@news_bp.route('/', methods=['GET'])
def get_news():
    news_articles = fetch_news_articles(api_key, stock_symbols)
    unique_headlines = [article['title'] for article in news_articles]
    # unique_headlines = list(set(article['title'] for article in news_articles if article['title']))
    print(unique_headlines, 'aASAAAAAAAA')

    prompt = f"""
    You are an AI financial assistant providing personalized news summaries.

    User's Stock Holdings: {stock_symbols}

    Recent News Headlines:
    {chr(10).join(unique_headlines)}

    For each stock, analyze the news headlines and provide:

    - A concise summary of key events affecting the stock.
    - Potential impact on the stock's performance.
    - Personalized advice based on the user's holdings.

    Format your response in JSON as follows:

    {{
    "stock_symbol": {{
        "summary": "Summary of key events...",
        "impact": "Potential impact...",
        "advice": "Your personalized advice..."
    }},
    ...
    }}
    but remember to not wrap it in```json ``` as it clashes with my processing.
    """
    # Simple prompt for OpenAI API
    system_content = '''
    You are an AI assistant specializing in financial analysis and personalized advice.
    '''
    messages = [{'role': 'system', 'content': system_content.strip()}]
    # messages.append({'role': 'assistant', 'content': f"input user specific data"})
    messages.append({'role': 'user', 'content': prompt.strip()})
    response = client.chat.completions.create(
        model='gpt-4o',
        messages=messages,
        max_tokens=800,
        stream=False
    )
    summary = response.choices[0].message.content.strip()
    print(summary)
    return jsonify({'summary': summary})
