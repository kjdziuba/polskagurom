# backend/routes/net_worth.py

from flask import Blueprint, jsonify

net_worth_bp = Blueprint('net_worth_bp', __name__, url_prefix='/api/net-worth')

@net_worth_bp.route('/', methods=['GET'])
def get_net_worth():
    # Mock data
    net_worth_data = {
        'dates': ['2024-08-01', '2024-09-01', '2024-10-01', '2024-11-01'],
        'values': [10000, 10500, 11000, 12000]
    }
    return jsonify(net_worth_data)
