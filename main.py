# File name: main.py
# Author: Kyle McColgan
# Date: 02 February 2025
# Description: Contains the render-static function for static deployment.

from flask import Flask, render_template
import os
from app import create_app
from app.routes import bp as main_routes_bp  # Import the Blueprint with an alias.

def create_app():
    # Set the base path depending on environment (GitHub Pages vs Local).
    base_path = '/myTimer' if os.environ.get('FLASK_ENV') == 'production' else ''

    # Configure the Flask app
    app = Flask(__name__,
                static_folder="dist/static",  # Static files will come from dist/static.
                static_url_path=f"{base_path}/static",  # Prefix static URLs for production.
                template_folder="app/templates")  # Templates should be in app/templates.

    # Store the base path to be used in templates.
    app.config['BASE_PATH'] = base_path

    # Register the blueprint from routes.py.
    app.register_blueprint(main_routes_bp)

    # Debugging: List all templates loaded by Flask.
    print(app.jinja_loader.list_templates())

    return app

app = create_app()  # Initialize Flask app.

print(f"Base path is set to: {app.config['BASE_PATH']}") # For debugging purposes...

# Set base path depending on environment
if os.environ.get('FLASK_ENV') == 'production':
    app.config['BASE_PATH'] = '/myTimer/'  # For GitHub Pages.
else:
    app.config['BASE_PATH'] = '/'  # For local development.

# Add the Flask CLI command to render templates into static HTML...
@app.cli.command("render-static")
def render_static():
    """
    Render all Jinja2 templates into plain static HTML files,
    and save them to the 'dist' directory at the project root.
    """
    template_folder = os.path.join(app.root_path, 'app/templates')
    output_folder = os.path.abspath(os.path.join(app.root_path, '..', 'dist'))

    os.makedirs(output_folder, exist_ok=True)

    base_path = app.config['BASE_PATH']
    app.jinja_env.globals['base_path'] = base_path  # Make base_path globally available.

    for template_name in os.listdir(template_folder):
        if template_name.endswith('.html'):
            # Render the template with the updated base_path
            rendered = render_template(template_name, base_path=base_path)

            # Adjust static paths for production (GitHub Pages) or local.
            # if base_path == '/myTimer/':
            #     # For GitHub Pages, replace '/static/' with '/myTimer/dist/static/'.
            #     rendered = rendered.replace('/static/', '/myTimer/dist/static/')
            #     rendered = rendered.replace('href="/static/', 'href="/myTimer/dist/static/')
            #     rendered = rendered.replace('src="/static/', 'src="/myTimer/dist/static/')
            # else:
            #     # For local development, leave the static file paths as '/static/'.
            #     rendered = rendered.replace('/static/', '/static/')
            #     rendered = rendered.replace('href="/static/', 'href="/static/')
            #     rendered = rendered.replace('src="/static/', 'src="/static/')

            # Save the rendered HTML in the output folder.
            output_path = os.path.join(output_folder, template_name)
            with open(output_path, 'w') as f:
                f.write(rendered)

            print(f"Rendered {template_name} -> {output_path}")

    # Rename timer.html to index.html for GitHub Pages.
    index_path = os.path.join(output_folder, 'index.html')
    timer_path = os.path.join(output_folder, 'timer.html')
    if os.path.exists(timer_path):
        os.rename(timer_path, index_path)
        print(f"Renamed timer.html -> index.html")

if __name__ == '__main__':
    app.run(debug=True)
