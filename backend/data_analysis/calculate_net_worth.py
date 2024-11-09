import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from datetime import datetime

ACCOUNT_FILES = {
    'Cash': ['data/bank_acc/bank_acc_1.xlsx', 'data/bank_acc/bank_acc_2.xlsx'],
    'Savings': ['data/bank_acc/savings_acc_1.xlsx', 'data/bank_acc/savings_acc_2.xlsx'],
}

INVESTMENT_FILES = ['data/bank_acc/stock.xlsx']

# Function to read in bank account data
def read_bank_acc(bank_acc_file):
    # Read in Excel file
    bank_acc = pd.read_excel(bank_acc_file)
    bank_acc.columns = ['Date', 'Title', 'Type', 'Amount', 'Balance']
    bank_acc['Date'] = pd.to_datetime(bank_acc['Date'], format='%Y-%m-%d')
    # Sort by date
    bank_acc = bank_acc.sort_values(by='Date')
    # Filter out 'future' data
    bank_acc = bank_acc[bank_acc['Date']<datetime.today().strftime('%Y-%m-%d')]
    return bank_acc

def read_savings_acc(savings_acc_file):
    # Read in Excel file
    savings_acc = pd.read_excel(savings_acc_file, comment='#')
    savings_acc.columns = ['Date', 'Transfer In', 'Added interest', 'Balance']
    savings_acc['Date'] = pd.to_datetime(savings_acc['Date'], format='%Y-%m-%d')
    # Sort by date
    savings_acc = savings_acc.sort_values(by='Date')
    # Filter out 'future' data
    savings_acc = savings_acc[savings_acc['Date']<datetime.today().strftime('%Y-%m-%d')]
    return savings_acc

def read_investment(investment_file):
    # Read in Excel file
    investment = pd.read_excel(investment_file)
    investment.columns = ['Date', 'Name', 'Quantity', 'Price']
    investment['Date'] = pd.to_datetime(investment['Date'], format='%Y-%m-%d')
    # Sort by date
    investment = investment.sort_values(by='Date')
    # Filter out 'future' data
    investment = investment[investment['Date']<datetime.today().strftime('%Y-%m-%d')]
    return investment

def create_net_worth_df(start_date='2024-01-01', end_date=datetime.today().strftime('%Y-%m-%d')):
    # Create DataFrame for net worth
    net_worth = pd.DataFrame({
        'Date': pd.date_range(start=start_date, end=end_date),
        'Net Worth': 0.0,
        'Cash': 0.0,
        'Savings': 0.0,
        'Investments': 0.0,
        'Other': 0.0
    })
    return net_worth


def create_stocks_df(investment, start_date='2024-01-01', end_date=datetime.today().strftime('%Y-%m-%d')):
    # Create a DataFrame with a date range
    dates = pd.date_range(start=start_date, end=end_date)
    stock_names = investment['Name'].unique()
    
    # Create DataFrames for stock quantities and stock prices
    stock_quantities = pd.DataFrame(columns=['Date', *stock_names])
    stock_quantities['Date'] = pd.date_range(start=start_date, end=end_date)
    stock_quantities['Date'] = pd.to_datetime(stock_quantities['Date'], format='%Y-%m-%d')
    stock_prices = pd.DataFrame(columns=['Date', *stock_names])
    stock_prices['Date'] = pd.date_range(start=start_date, end=end_date)
    stock_prices['Date'] = pd.to_datetime(stock_prices['Date'], format='%Y-%m-%d')

    # Iterate over each stock and populate quantities
    for name in stock_names:
        for date in dates:
            # Calculate total quantity for the stock up to the current date
            stock_quantity = investment[(investment['Date'] <= date) & (investment['Name'] == name)]['Quantity'].sum()
            
            # Assign the quantity to the quantities DataFrame
            stock_quantities.loc[stock_quantities['Date']==date, name] = stock_quantity
            
            # Stock price is fixed as 1.0 for now (replace with actual logic if available)
            stock_prices.loc[stock_prices['Date']==date, name] = 1.0

    # Combine quantities and prices into a single DataFrame if necessary
    # Here, we use MultiIndex columns to represent both quantity and price
    stock_df = pd.concat({'Quantity': stock_quantities, 'Price': stock_prices}, axis=1)
    
    return stock_df

def add_account(net_worth, account, type):
    for date in net_worth['Date']:
        last_balance = account[account['Date']<=date]['Balance'].iloc[-1]
        net_worth.loc[net_worth['Date']==date, ['Net Worth', type]] += last_balance
    return net_worth

def add_investment(net_worth, stock_df):
    stock_names = (stock_df.columns.levels[1])[1::]
    for date in net_worth['Date']:
        total_stocks = 0.0
        index = stock_df.index[stock_df[('Quantity', 'Date')]==date][0]
        for name in stock_names:
            total_stocks += stock_df.loc[index, ('Quantity', name)] * stock_df.loc[index, ('Price', name)]
        net_worth.loc[net_worth['Date']==date, ['Net Worth', 'Investments']] += total_stocks
        
    return net_worth


def save_net_worth(net_worth, filename='data/net_worth.json'):
    net_worth['Date'] = net_worth['Date'].dt.strftime('%Y-%m-%d')
    net_worth.to_json(filename, index=False)

ACCOUNTS = {"Cash": [], "Savings": []}
for acc_file in ACCOUNT_FILES["Cash"]:
    bank_acc = read_bank_acc(acc_file)
    ACCOUNTS["Cash"].append(bank_acc)
for acc_file in ACCOUNT_FILES["Savings"]:
    savings_acc = read_savings_acc(acc_file)
    ACCOUNTS["Savings"].append(savings_acc)

net_worth = create_net_worth_df()
investment = read_investment(INVESTMENT_FILES[0])
stock = create_stocks_df(investment)
#print(stock.tail(10))
for acc_type in ACCOUNTS:
    for account in ACCOUNTS[acc_type]:
        net_worth = add_account(net_worth, account, acc_type)

net_worth = add_investment(net_worth, stock)

print(net_worth.tail(50))

# Save net worth data
save_net_worth(net_worth)