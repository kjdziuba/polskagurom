# backend/routes/net_worth.py

from flask import Blueprint, jsonify
import json
import os

net_worth_bp = Blueprint('net_worth_bp', __name__, url_prefix='/api/net-worth')
net_worth_investment_bp = Blueprint('net_worth_investment_bp', __name__, url_prefix='/api/net-worth-investment')

from sklearn.linear_model import LinearRegression
import numpy as np

@net_worth_bp.route('/', methods=['GET'])
def get_net_worth():
    import pandas as pd

    data_file_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'normal', 'net_worth.json')

    try:
        df = pd.read_json(data_file_path)
        if '0' in df.columns:
            df = df.transpose()
        
        # Convert 'Date' to datetime
        df['Date'] = pd.to_datetime(df['Date'])
        df.sort_values('Date', inplace=True)
        
        # Prepare data for regression
        df['Days'] = (df['Date'] - df['Date'].min()).dt.days
        X = df[['Days']]
        y = df['Net Worth']

        # Fit linear regression
        model = LinearRegression()
        model.fit(X, y)

        # Predict future net worth for the next N days
        N = 30  # Number of days to predict
        last_day = df['Days'].max()
        future_days = np.arange(last_day + 1, last_day + N + 1).reshape(-1, 1)
        future_dates = df['Date'].max() + pd.to_timedelta(np.arange(1, N + 1), unit='D')
        future_values = model.predict(future_days)

        # Combine historical and future data
        all_dates = df['Date'].tolist() + future_dates.tolist()
        all_values = y.tolist() + future_values.tolist()

        # Include components
        components = ['Cash', 'Savings', 'Investments']
        data = []
        for i, date in enumerate(all_dates):
            entry = {
                'date': date.strftime('%Y-%m-%d'),
                'Net Worth': all_values[i],
                'status': 'actual' if i < len(df) else 'predicted'
            }
            for comp in components:
                if comp in df.columns:
                    if i < len(df):
                        entry[comp] = df.iloc[i][comp]
                    else:
                        # For predicted values, you can either leave components as None or implement predictions
                        entry[comp] = None
            data.append(entry)

        return jsonify(data)
    except Exception as e:
        print(f"Error reading net worth data: {e}")
        return jsonify({'error': 'Failed to read net worth data'}), 500

@net_worth_investment_bp.route('/', methods=['GET'])
def get_new_worth_investments():
    # Load data 
    da = json.load(open("backend/data/normal/profit.json","r"))
    data = {
        'categories': list(da.keys()),
        'amounts': list(da.values())
    }
    return jsonify(data)