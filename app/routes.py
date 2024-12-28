from flask import Blueprint, request, jsonify, render_template
from app import db
from app.models import TimerLog

# Define the blueprint
bp = Blueprint('routes', __name__)

# Add routes to the blueprint
@bp.route('/', methods=['GET', 'POST'])
def root():
    if request.method == 'GET':
        # Handle listing all timers
        timers = TimerLog.query.all()

        # Check if the request is from a browser (HTML view) or API (JSON)
        if request.accept_mimetypes.accept_json and not request.accept_mimetypes.accept_html:
            # If JSON is requested, return JSON data
            result = [
                {
                    'id': t.id,
                    'task_name': t.task_name,
                    'start_time': t.start_time.isoformat(),
                    'end_time': t.end_time.isoformat() if t.end_time else None,
                    'duration': t.duration
                }
                for t in timers
            ]
            return jsonify(result)
        else:
            # If HTML is requested (for browser), return the timer.html page
            return render_template('timer.html', timers=timers)

    elif request.method == 'POST':
        action = request.json.get('action')

        if action == 'start':
            # Start a timer
            task_name = request.json.get('task_name', 'Unnamed Task')
            timer_log = TimerLog(task_name=task_name)
            db.session.add(timer_log)
            db.session.commit()
            return jsonify({'message': f'Timer started for task: {task_name}', 'timer_id': timer_log.id})

        elif action == 'stop':
            # Stop a timer
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
