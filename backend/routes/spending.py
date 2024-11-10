from flask import Blueprint, jsonify
from data_analysis.calculate_spending import *

spending_bp = Blueprint('spending_bp', __name__, url_prefix='/api/spending')
spending_extended_bp = Blueprint('spending_extended_bp', __name__, url_prefix='/api/spending_extended')
specific_spending_bp = Blueprint('specific_spending_bp', __name__, url_prefix='/api/specific_spending')

@spending_bp.route('/', methods=['GET'])
def get_spending():
    # Mock data
    #spending_data = {'categories': ['Rent', 'Food', 'Utilities', 'Entertainment'],'amounts': [800, 300, 150, 200]}

    # Get spending data
    data = get_last_month_spending(create_spending_df())
    data = data.groupby('Category')['Amount'].sum()
    categories = data.index.values.tolist()
    amounts = data.values.tolist()
    spending_data = {
        'categories': categories,
        'amounts': amounts
    }
    return jsonify(spending_data)


@spending_extended_bp.route('/', methods=['GET'])
def get_spending_history():
    data = create_spending_df()
    
    # Mock data
    spending_history = []

    for i in range(10):
        date, categories, amounts = get_categories_amounts(data, 11-i)
        spending_history.insert(0,{
            'date': date,
            'categories': categories,
            'amount': amounts
        })
    return jsonify(spending_history)

@specific_spending_bp.route('/', methods=['GET'])
def get_specific_spending():
    specific_data = create_spending_df()
    specific_data['Date'] = specific_data['Date'].apply(lambda x: x.strftime('%Y-%m-%d'))
    spending_history = []

    date = specific_data['Date'].tolist()
    categories = specific_data['Category'].tolist()
    amounts = specific_data['Amount'].tolist()
    title = specific_data['Title'].tolist()

    for i in range(len(date)):
        spending_history.append({
            'date': date[i],
            'category': categories[i],
            'amount': amounts[i],
            'title': title[i]
        })
        
    return jsonify(spending_history)