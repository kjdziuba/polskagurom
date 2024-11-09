# backend/data_fetching/financial_data.py

import requests

def get_stock_price(ticker):
    url = f'https://api.jakis_yahoo.com/stock/{ticker}'
    response = requests.get(url)
    return response.json()
