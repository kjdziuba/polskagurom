import json
from flask import Blueprint, request, jsonify

save_input_bp = Blueprint('save_input_bp', __name__, url_prefix='/api/save_input')
output_bp = Blueprint('output_bp', __name__, url_prefix='/api/output')

@save_input_bp.route('/', methods=['POST'])
def save_input():
    data = request.json  # Get JSON data from request
    user_input = data.get('input')

    if user_input is None:
        return jsonify({"message": "No input provided!"}), 400

    # Save input to a file
    with open('data/user_input.txt', 'a') as f:
        f.write(user_input + '\n')

    return jsonify({"message": "Input saved successfully!"})


@output_bp.route('/', methods=['GET'])
def output_data():
    with open('data/user_input.txt', 'r') as f:
        data = f.readlines()

    return jsonify({"data": data})