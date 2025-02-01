from flask import Flask, Blueprint, render_template, request, jsonify, send_from_directory
from app.models import TimerLog
import shutil
import os
from flask import current_app

# Define the blueprint.
bp = Blueprint('main_routes', __name__)

# Serve JavaScript (.mjs) files.
@bp.route('/static/js/<path:filename>')
def serve_mjs(filename):
    return send_from_directory(os.path.join(current_app.root_path, 'dist', 'static', 'js'), filename)

# Serve any static file from /dist/static/.
@bp.route('/dist/static/<path:filename>')
def serve_dist_static(filename):
    file_path = os.path.join(current_app.root_path, '..', 'dist', 'static', filename)
    if not os.path.exists(file_path):
        return "File not found", 404
    else:
        return send_from_directory(os.path.join(current_app.root_path, '..', 'dist', 'static'), filename)
    return send_from_directory(os.path.join(current_app.root_path, 'dist', 'static'), filename)

# Add routes to the blueprint
@bp.route('/', methods=['GET', 'POST'])
def root():
    if request.method == 'GET':
        # Handle GET request: render the template.
        return render_template('timer.html', base_path=current_app.config['BASE_PATH'])
    elif request.method == 'POST':
        # Handle POST request: process the timer actions.
        action = request.json.get('action')

        if action == 'start':
            # Start a timer.
            task_name = request.json.get('task_name', 'Unnamed Task')
            timer_log = TimerLog(task_name=task_name)
            db.session.add(timer_log)
            db.session.commit()
            return jsonify({'message': f'Timer started for task: {task_name}', 'timer_id': timer_log.id})

        elif action == 'stop':
            # Stop a timer.
            timer_id = request.json.get('timer_id')
            if not timer_id:
                return jsonify({'error': 'Timer ID not provided'}), 400

            timer_log = TimerLog.query.get(timer_id)
            if not timer_log:
                return jsonify({'error': 'Timer not found'}), 404

            timer_log.stop_timer()
            db.session.commit()
            return jsonify({
                'message': f'Timer stopped for task: {timer_log.task_name}',
                'duration': timer_log.duration
            })

        return jsonify({'error': 'Invalid action'}), 400

# New About Page Route.
@bp.route('/about')
def about():
    return render_template('about.html', base_path=current_app.config['BASE_PATH'])

# New Contact Page Route.
@bp.route('/contact')
def contact():
    return render_template('contact.html', base_path=current_app.config['BASE_PATH'])

@bp.route('/render', methods=['GET'])
def render_page():
    # Logging to confirm route is hit.
    print("Render route hit...")

    # Render the HTML from the template with base_path
    rendered_html = render_template('timer.html', base_path=current_app.config['BASE_PATH'])

    # Ensure the dist directory exists.
    os.makedirs('dist', exist_ok=True)

    # Write the rendered HTML to index.html.
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

    # Return confirmation message for debugging purposes...
    return "Rendered index.html and copied static files in dist/"
