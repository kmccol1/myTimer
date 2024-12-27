# myTimer

myTimer App is a Python Flask-based web application designed to help anyone manage tasks with a simple timer interface. The app allows one to start, track, and stop timers, with durations displayed dynamically in real-time.

## Features

- Start a new timer with a selectable duration.
- Track active timers with a dynamic countdown or count-up display.
- Stop active timers and save their duration.
- Streamlined UI with clean HTML structure and CSS styling.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/myTimer-app.git
   cd myTimer-app
   ```

2. Create and activate a virtual environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask application:

   ```bash
   flask run
   ```

5. Open your browser and visit:

   ```
   http://127.0.0.1:5000
   ```

## Usage

- Select a duration from the dropdown menu and start a new timer.
- Track the timer's progress dynamically on the UI.
- Stop the timer to save its duration.

## File Structure

```
elegant-timer-app/
├── app/
│   ├── templates/
│   │   ├── base.html
│   │   ├── timer.html
│   ├── static/
│   │   ├── styles.css
│   ├── __init__.py
│   ├── routes.py
│   ├── models.py
├── venv/
├── requirements.txt
├── README.md
└── run.py
```

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Developed by Kyle McColgan**
