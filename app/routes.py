from flask import Flask, Blueprint, render_template

# Define the blueprint
bp = Blueprint('routes', __name__)
app = Flask(__name__)  # This is the Flask app instance

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

@app.route("/render")
def render_page():
    rendered_html = render_template('timer.html')
    os.makedirs('dist', exist_ok=True)

    with open('dist/index.html', 'w') as f:
        f.write(rendered_html)

    print("Successfully rendered index.html")
    return "Rendered index.html in dist/"
