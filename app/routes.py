from flask import Flask, Blueprint, render_template
import shutil
import os

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
    # Logging to confirm route is hit
    print("Render route hit...")

    # Render the HTML from the template
    rendered_html = render_template('timer.html')

    # Ensure the dist directory exists
    os.makedirs('dist', exist_ok=True)

    # Write the rendered HTML to index.html
    try:
        with open('dist/index.html', 'w') as f:
            f.write(rendered_html)
        print("Successfully rendered index.html")
    except Exception as e:
        print(f"Error while writing to file: {e}")
        return "Error rendering index.html", 500

    # Copy static assets to dist/
    try:
        if os.path.exists('static'):
            shutil.copytree('static', 'dist/static', dirs_exist_ok=True)
            print("Successfully copied static files")
        else:
            print("Static directory does not exist")
    except Exception as e:
        print(f"Error while copying static files: {e}")
        return "Error copying static files", 500

    # Return confirmation message
    return "Rendered index.html and copied static files in dist/"
