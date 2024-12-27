import sys
import os

# Add the project root directory to the Python module search path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db  # Import app and db after adjusting the path

app = create_app()

with app.app_context():
    db.create_all()
print("Database initialized!")
