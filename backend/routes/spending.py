from flask import Blueprint, jsonify
from data_analysis.calculate_spending import *

spending_bp = Blueprint('spending_bp', __name__, url_prefix='/api/spending')
spending_extended_bp = Blueprint('spending_extended_bp', __name__, url_prefix='/api/spending_extended')

@spending_bp.route('/', methods=['GET'])
def get_spending():
    # Mock data
    spending_data = {
        'categories': ['Rent', 'Food', 'Utilities', 'Entertainment'],
        'amounts': [800, 300, 150, 200]
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
    print(spending_history)
    return jsonify(spending_history)