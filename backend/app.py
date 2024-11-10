from flask import Flask
from routes.net_worth import net_worth_bp
from routes.net_worth import net_worth_investment_bp
from routes.future_me import future_me_bp
from routes.spending import spending_bp
from routes.news import news_bp
from routes.notifications import notifications_bp
from routes.spending import spending_extended_bp
from routes.spending import specific_spending_bp
from flask_cors import CORS
from dotenv import load_dotenv
import os
import sys

# Add the path to the folder containing the module
sys.path.append(os.path.relpath(".."))


load_dotenv()
app = Flask(__name__)
CORS(app)
openai_api_key = os.getenv('OPENAI_API_KEY')

# Register blueprints
app.register_blueprint(net_worth_bp)
app.register_blueprint(future_me_bp)
app.register_blueprint(spending_bp)
app.register_blueprint(news_bp)
app.register_blueprint(notifications_bp)
app.register_blueprint(spending_extended_bp)
app.register_blueprint(specific_spending_bp)
app.register_blueprint(net_worth_investment_bp)

if __name__ == '__main__':
    app.run(debug=True)
