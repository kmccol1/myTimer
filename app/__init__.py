from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Initialize the SQLAlchemy object
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Database setup
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mytimer.db'  # Make sure the URI is correct
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()  # Creates the database tables

    # Register blueprint
    from app.routes import bp
    app.register_blueprint(bp)

    return app
