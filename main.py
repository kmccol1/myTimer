# File name: main.py
# Author: Kyle McColgan
# Date: 27 January 2025
# Description: Contains the render-static function for static deployment.

from flask import Flask, render_template
import os
from app import create_app
from app.routes import bp as main_routes_bp  # Import with an alias.

app = create_app()  # Initialize the app using the create_app() function.

# Set base path depending on environment
app.config['BASE_PATH'] = '/myTimer' if os.environ.get('FLASK_ENV') == 'production' else '/'
app.jinja_env.globals['base_path'] = app.config['BASE_PATH']

# Add the Flask CLI command to render templates into static HTML...
@app.cli.command("render-static")
def render_static():
    """
    Render all Jinja2 templates into plain static HTML files
    and save them to the 'dist' directory at the project root.
    """

    # Get the template folder contents.
    template_folder = os.path.join(app.root_path, 'templates')

    # Define the output folder to be at the project root.
    output_folder = os.path.abspath(os.path.join(app.root_path, '..', 'dist'))

    os.makedirs(output_folder, exist_ok=True)

    # Render each template into a static HTML file for GitHub Pages deployment.
    for template_name in os.listdir(template_folder):
        if template_name.endswith('.html'):
            rendered = render_template(template_name)
            output_path = os.path.join(output_folder, template_name)

            with open(output_path, 'w') as f:
                f.write(rendered)

            print(f"Rendered {template_name} -> {output_path}")

    # Optionally, make `timer.html` the `index.html` for GitHub Pages
    index_path = os.path.join(output_folder, 'index.html')
    timer_path = os.path.join(output_folder, 'timer.html')

    if os.path.exists(timer_path):
        os.rename(timer_path, index_path)
        print(f"Renamed timer.html -> index.html")

if __name__ == '__main__':
    app.run(debug=True)
