document.addEventListener('DOMContentLoaded', function () {
    let currentTimerInterval = null;
    let elapsedTime = 0; // Track elapsed time in milliseconds
    let timerDuration = 0; // Timer's total duration in milliseconds
    const timerElement = document.getElementById('current-timer');
    const startButton = document.getElementById('start-btn');
    const stopButton = document.getElementById('stop-btn');

    function updateTimer() {
        // Format elapsed time
        const hours = Math.floor(elapsedTime / 3600000);
        const minutes = Math.floor((elapsedTime % 3600000) / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const milliseconds = elapsedTime % 1000;

        // Update the main timer display
        timerElement.textContent =
            (hours < 10 ? '0' : '') + hours + ':' +
            (minutes < 10 ? '0' : '') + minutes + ':' +
            (seconds < 10 ? '0' : '') + seconds + '.' +
            (milliseconds < 100 ? '0' : '') + (milliseconds < 10 ? '0' : '') + milliseconds;

        // Stop the timer if the duration has been reached
        if (elapsedTime >= timerDuration) {
            clearInterval(currentTimerInterval);
            timerElement.textContent = "Time's up!";
            stopButton.disabled = true;
        } else {
            elapsedTime++;
        }
    }

    startButton.addEventListener('click', function () {
        timerDuration = parseInt(document.getElementById('duration').value, 10) * 1000; // Convert to milliseconds
        elapsedTime = 0;
        startButton.disabled = true;
        stopButton.disabled = false;

        // Start the interval
        currentTimerInterval = setInterval(updateTimer, 1); // Update every millisecond
    });

    stopButton.addEventListener('click', function () {
        clearInterval(currentTimerInterval);
        startButton.disabled = false;
        stopButton.disabled = true;
        timerElement.textContent = "00:00:00.000"; // Reset the timer
    });
});
