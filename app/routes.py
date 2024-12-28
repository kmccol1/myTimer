from flask import Blueprint, render_template

# Define the blueprint
bp = Blueprint('routes', __name__)

# Add routes to the blueprint
@bp.route('/', methods=['GET'])
def root():
    return render_template('timer.html')
