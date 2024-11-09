from flask import Blueprint, jsonify

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
    # Mock data
    spending_history = [
        {
            'date': '2021-01-01',
            'categories': ['Rent', 'Food', 'Utilities', 'Entertainment'],
            'amount': [800, 300, 150, 200]
        },
        {
            'date': '2021-01-02',
            'categories': ['Rent', 'Food', 'Utilities', 'Entertainment'],
            'amount': [400, 300, 150, 200]
        },
        {
            'date': '2021-01-03',
            'categories': ['Rent', 'Food', 'Utilities', 'Entertainment'],
            'amount': [230, 300, 150, 200]
        },
        {
            'date': '2021-01-04',
            'categories': ['Rent', 'Food', 'Utilities', 'Entertainment'],
            'amount': [1000, 300, 150, 200]
        }
    ]
    return jsonify(spending_history)
