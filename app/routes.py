from flask import Blueprint, render_template

# Define the blueprint
bp = Blueprint('routes', __name__)

# Add routes to the blueprint
@bp.route('/', methods=['GET'])
def root():
    return render_template('timer.html')

# New About Page Route
@bp.route('/about')
def about():
    return render_template('about.html')

# New Contact Page Route
@bp.route('/contact')
def contact():
    return render_template('contact.html')
