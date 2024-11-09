from flask import Blueprint, jsonify

notifications_bp = Blueprint('notifications_bp', __name__, url_prefix='/api/notifications')

@notifications_bp.route('/', methods=['GET'])
def get_notifications():
    # Mock notifications
    notifications = [
        "You have exceeded your entertainment budget by $50 this month.",
        "Your investment in XYZ Corp has increased by 5%.",
        "Upcoming bill: Credit Card payment due in 3 days."
    ]
    return jsonify({'notifications': notifications})
