from flask import Flask
from routes.net_worth import net_worth_bp
from routes.future_me import future_me_bp
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
CORS(app)
openai_api_key = os.getenv('OPENAI_API_KEY')

# Register blueprints
app.register_blueprint(net_worth_bp)
app.register_blueprint(future_me_bp)
if __name__ == '__main__':
    app.run(debug=True)
