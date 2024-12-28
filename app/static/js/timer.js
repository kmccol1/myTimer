let timerRunning = false;
let timerInterval;
let duration = 0; // store selected duration here

function startTimer()
{
    if (timerRunning) return; // Prevent starting multiple timers
    const startButton = document.getElementById("start-btn");
    const stopButton = document.getElementById("stop-btn");
    const timerDisplay = document.getElementById("current-timer");

    // Get the selected duration (in seconds)
    duration = document.getElementById("duration").value;

    // Start countdown or count-up based on your logic
    startButton.disabled = true;
    stopButton.disabled = false;

    // Timer logic (for simplicity, this is count-up for now)
    let startTime = Date.now();

    timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const seconds = Math.floor(elapsed / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        const displayTime = `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}.${String(elapsed % 1000).padStart(3, '0')}`;

        timerDisplay.textContent = displayTime;
    }, 10); // Update every 10ms

    // After the selected duration, automatically stop the timer (optional)
    setTimeout(stopTimer, duration * 1000); // Stops the timer after the selected duration
}

function stopTimer()
{
    if (!timerRunning) return;

    clearInterval(timerInterval);
    timerRunning = false;

    // Handle what happens when the timer stops (e.g., save the time)
    const startButton = document.getElementById("start-btn");
    const stopButton = document.getElementById("stop-btn");
    startButton.disabled = false;
    stopButton.disabled = true;
}
