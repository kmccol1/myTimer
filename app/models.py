from datetime import datetime

class TimerLog:
    def __init__(self, task_name):
        """Initialize a new timer log."""
        self.id = None  # Use a unique identifier.
        self.task_name = task_name
        self.start_time = None
        self.end_time = None
        self.duration = None  # Duration in seconds.

    def calculate_duration(self):
        """Calculate and update the duration if end_time is set."""
        if self.end_time and self.start_time:
            self.duration = (self.end_time - self.start_time).total_seconds()

    def start_timer(self):
        """Start a new timer."""
        self.start_time = datetime.utcnow()
        self.end_time = None
        self.duration = None

    def stop_timer(self):
        """Stop the timer and calculate the duration."""
        self.end_time = datetime.utcnow()
        self.calculate_duration()

    def to_dict(self):
        """Convert the timer log to a dictionary for serialization."""
        return {
            "id": self.id,
            "task_name": self.task_name,
            "start_time": self.start_time.isoformat() if self.start_time else None,
            "end_time": self.end_time.isoformat() if self.end_time else None,
            "duration": self.duration
        }

    @staticmethod
    def from_dict(data):
        """Create a TimerLog object from a dictionary."""
        timer = TimerLog(data.get("task_name"))
        timer.id = data.get("id")
        timer.start_time = datetime.fromisoformat(data["start_time"]) if data.get("start_time") else None
        timer.end_time = datetime.fromisoformat(data["end_time"]) if data.get("end_time") else None
        timer.duration = data.get("duration")
        return timer
