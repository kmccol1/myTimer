from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from .models import TimerLog
from . import db
from datetime import datetime

bp = Blueprint('routes', __name__)

@bp.route('/')
def index():
    timers = TimerLog.query.order_by(TimerLog.start_time.desc()).all()
    return render_template('timer.html', timers=timers)

@bp.route('/start', methods=['POST'])
def start_timer():
    duration = request.form.get('duration', 0, type=int)  # Get duration as an integer
    new_timer = TimerLog(task_name='Default Timer', duration=duration)
    db.session.add(new_timer)
    db.session.commit()
    return redirect(url_for('routes.index'))


@bp.route('/stop/<int:timer_id>', methods=['POST'])
def stop_timer(timer_id):
    timer = TimerLog.query.get_or_404(timer_id)
    if timer and not timer.end_time:
        timer.end_time = datetime.utcnow()
        timer.calculate_duration()
        db.session.commit()
    return redirect(url_for('routes.index'))
