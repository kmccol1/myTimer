# File name: main.py

from flask import Flask, render_template
import os
from app import create_app
from app.routes import bp as main_routes_bp  # Import with an alias.

app = create_app()  # Initialize the app using the create_app() function.

# Add the Flask CLI command to render templates into static HTML...
@app.cli.command("render-static")
def render_static():
    """
    Render all Jinja2 templates into plain static HTML files
    and save them to the 'dist' directory.
    """
    template_folder = os.path.join(app.root_path, 'templates')
    output_folder = os.path.join(app.root_path, 'dist')

    os.makedirs(output_folder, exist_ok=True)

    # Render each template into a static HTML file.
    for template_name in os.listdir(template_folder):
        if template_name.endswith('.html'):
            rendered = render_template(template_name)
            output_path = os.path.join(output_folder, template_name)

            with open(output_path, 'w') as f:
                f.write(rendered)

            print(f"Rendered {template_name} -> {output_path}")

if __name__ == '__main__':
    app.run(debug=True)
