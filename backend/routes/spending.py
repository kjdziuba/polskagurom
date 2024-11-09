from flask import Blueprint, jsonify

spending_bp = Blueprint('spending_bp', __name__, url_prefix='/api/spending')

@spending_bp.route('/', methods=['GET'])
def get_spending():
    # Mock data
    spending_data = {
        'categories': ['Rent', 'Food', 'Utilities', 'Entertainment'],
        'amounts': [800, 300, 150, 200]
    }
    return jsonify(spending_data)
