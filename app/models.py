from . import db
from datetime import datetime

class TimerLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(100), nullable=False)
    start_time = db.Column(db.DateTime, default=datetime.utcnow)
    end_time = db.Column(db.DateTime, nullable=True)
    duration = db.Column(db.Float, nullable=True)  # Duration in seconds

    def calculate_duration(self):
        if self.end_time:
            self.duration = (self.end_time - self.start_time).total_seconds()
