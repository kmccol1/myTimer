# File name: main.py
# Author: Kyle McColgan
# Date: 31 January 2025
# Description: Contains the render-static function for static deployment.

from flask import Flask, render_template
import os
from app import create_app
from app.routes import bp as main_routes_bp  # Import with an alias.

app = create_app()  # Initialize the app using the create_app() function.

# Set base path depending on environment.
if os.environ.get('FLASK_ENV') == 'production':
    app.config['BASE_PATH'] = '/myTimer/'  # This is for GitHub Pages.
else:
    app.config['BASE_PATH'] = '/'  # This is for local development.

app.jinja_env.globals['base_path'] = app.config['BASE_PATH']

# Add the Flask CLI command to render templates into static HTML...
@app.cli.command("render-static")
def render_static():
    """
    Render all Jinja2 templates into plain static HTML files,
    and save them to the 'dist' directory at the project root.
    """
    template_folder = os.path.join(app.root_path, 'templates')
    output_folder = os.path.abspath(os.path.join(app.root_path, '..', 'dist'))

    os.makedirs(output_folder, exist_ok=True)

    # Use the base_path from app.config for correct environment setup.
    base_path = app.config['BASE_PATH']  # Use the correct base path from the configuration.
    app.jinja_env.globals['base_path'] = base_path  # Make base_path globally available to templates.

    for template_name in os.listdir(template_folder):
        if template_name.endswith('.html'):
            # Render the template with the updated base_path.
            rendered = render_template(template_name, base_path=base_path)

            # If base_path is '/myTimer/', adjust static paths to avoid duplication
            if base_path == '/myTimer/':
                # Fix paths to make sure there's no duplication of '/myTimer/'
                rendered = rendered.replace('href="/static/', 'href="/myTimer/dist/static/')
                rendered = rendered.replace('src="/static/', 'src="/myTimer/dist/static/')

            # Save the rendered HTML in the output folder.
            output_path = os.path.join(output_folder, template_name)

            with open(output_path, 'w') as f:
                f.write(rendered)

            print(f"Rendered {template_name} -> {output_path}")

    # Make `timer.html` the `index.html` for GitHub Pages.
    index_path = os.path.join(output_folder, 'index.html')
    timer_path = os.path.join(output_folder, 'timer.html')

    if os.path.exists(timer_path):
        os.rename(timer_path, index_path)
        print(f"Renamed timer.html -> index.html")

if __name__ == '__main__':
    app.run(debug=True)
