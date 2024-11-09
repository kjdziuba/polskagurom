"""
Saves the dates in YYYY-MM-DD format
"""

import yfinance as yf
import csv
import pandas as pd
import json
## Tickers: 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB', 'TSLA', 'NVDA', 'PYPL', 'ADBE', 'NFLX'

## Functions 

def get_historical_stock_price(ticker, start_date, end_date):
    stock = yf.Ticker(ticker)
    stock_data = stock.history(start=start_date, end=end_date)
    return stock_data

def save_data(path, data):
    df = pd.DataFrame(data)
    df["Date"] = df.index
    df = df[ ['Date'] + [ col for col in df.columns if col != 'Date' ] ]
    df['Date'] = pd.to_datetime(df['Date']).dt.strftime('%Y-%m-%d')
    #df.to_csv(path+".csv", index=False)
    df.to_json(path+".json", orient='records')


def create_folder(folder):
    import os
    if not os.path.exists(folder):
        os.makedirs(folder)

def multiple_stocks(tickers, start_date, end_date,folder="stock_data"):
    create_folder(folder)
    for ticker in tickers:
        save_data("./stock_data/"+ticker+".json",get_historical_stock_price(ticker, start_date, end_date))

def live_stock_price(ticker):
    stock = yf.Ticker(ticker)
    return float(stock.fast_info.last_price)

## Main

#d = get_historical_stock_price('AAPL', '2020-01-01', '2020-12-31')
#save_data('AAPL', d)

#ST = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB', 'TSLA', 'NVDA', 'PYPL', 'ADBE', 'NFLX']
#multiple_stocks(ST, '2020-01-01', '2020-12-31')
