import yfinance as yf
import csv
import pandas as pd
## Tickers: 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB', 'TSLA', 'NVDA', 'PYPL', 'ADBE', 'NFLX'

## Functions 

def get_historical_stock_price(ticker, start_date, end_date):
    stock = yf.Ticker(ticker)
    stock_data = stock.history(start=start_date, end=end_date)
    return stock_data

def save_data(path, data):
    p = pd.DataFrame(data)
    p.to_csv(path)

def create_folder(folder):
    import os
    if not os.path.exists(folder):
        os.makedirs(folder)

def multiple_stocks(tickers, start_date, end_date,folder="stock_data"):
    create_folder(folder)
    for ticker in tickers:
        save_data("./stock_data/"+ticker+".csv",get_historical_stock_price(ticker, start_date, end_date))

def live_stock_price(ticker):
    stock = yf.Ticker(ticker)
    return stock.fast_info.last_price

## Main
"""
d = get_stock_price('AAPL', '2020-01-01', '2020-12-31')
save_data('AAPL.csv', d)
ST = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB', 'TSLA', 'NVDA', 'PYPL', 'ADBE', 'NFLX']
multiple_stocks(ST, '2020-01-01', '2020-12-31')
"""