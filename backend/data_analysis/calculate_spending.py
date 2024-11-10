import numpy as np
import pandas as pd
import datetime as dt
import nlp_categorize as nlp

ACCOUNT_FILES = ['data/bank_acc/bank_acc_1.xlsx', 'data/bank_acc/bank_acc_2.xlsx']

def read_spending_data(bank_acc_file):
    # Read in Excel file
    spending_data = pd.read_excel(bank_acc_file, usecols=[0, 1, 2, 3])
    spending_data.columns = ['Date', 'Title', 'Type', 'Amount']
    spending_data['Date'] = pd.to_datetime(spending_data['Date'], format='%Y-%m-%d')

    # Filter out only "Withdrawal" type transactions
    spending_data = spending_data[spending_data['Type']=='Withdrawal']
    # Remove withdrwal type column
    spending_data = spending_data.drop(columns=['Type'])

    # Remove minus sign from amount
    spending_data['Amount'] = np.abs(spending_data['Amount'])

    # Assign category based on title
    spending_data['Category'] = spending_data['Title'].apply(nlp.assign_category)

    return spending_data

def create_spending_df(start_date='2024-01-01', end_date=dt.datetime.today().strftime('%Y-%m-%d')):
    # Create DataFrame for spending
    spending = pd.DataFrame(columns=['Date', 'Title', 'Amount', 'Category'])
    spending['Date'] = pd.to_datetime(spending['Date'], format='%Y-%m-%d')

    for account_file in ACCOUNT_FILES:
        spending_data = read_spending_data(account_file)
        spending = pd.concat([spending, spending_data], ignore_index=True)

    # Sort by date
    spending = spending.sort_values(by='Date', ignore_index=True)
    # Filter out 'future' data
    spending = spending[spending['Date']<dt.datetime.today().strftime('%Y-%m-%d')]

    return spending

def get_spending_from_last_x_days(spending, x):
    # Get date x days ago
    date_min = (dt.datetime.today() - dt.timedelta(days=x)).strftime('%Y-%m-%d')
    # Get the spending for the last x days
    last_x_days_spending = spending[spending['Date'] >= date_min]
    return last_x_days_spending

def get_last_month_spending(spending):
    return get_spending_from_last_x_days(spending, 30)

def get_spending_by_category(spending, month=None):
    if month:
        spending = spending[spending['Date'].dt.month == month]
    return spending.groupby('Category')['Amount'].sum()

# Create DataFrame for spending
spending = create_spending_df()