from flask import Flask
from routes.net_worth import net_worth_bp
from routes.future_me import future_me_bp
from routes.spending import spending_bp
from routes.news import news_bp
from routes.notifications import notifications_bp
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
app.register_blueprint(spending_bp)
app.register_blueprint(news_bp)
app.register_blueprint(notifications_bp)

if __name__ == '__main__':
    app.run(debug=True)
