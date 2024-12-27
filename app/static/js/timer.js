document.addEventListener('DOMContentLoaded', function () {
    console.log("JavaScript loaded");

    // Select all timer elements
    const timers = document.querySelectorAll('[id^="timer-"]');

    timers.forEach(function (timerElement) {
        const durationStr = timerElement.getAttribute('data-duration'); // Get the data-duration
        const totalDuration = parseInt(durationStr, 10); // Total duration in seconds
        let elapsedTime = 0; // Start from 0 seconds

        if (isNaN(totalDuration) || totalDuration <= 0) {
            console.error(`Invalid duration: ${durationStr}`);
            timerElement.textContent = "Invalid timer";
            return;
        }

        console.log(`Timer ${timerElement.id} set for ${totalDuration} seconds`);

        function updateTimer() {
            const hours = Math.floor(elapsedTime / 3600);
            const minutes = Math.floor((elapsedTime % 3600) / 60);
            const seconds = elapsedTime % 60;

            // Update the timer's display text
            timerElement.textContent =
                (hours < 10 ? '0' : '') + hours + ':' +
                (minutes < 10 ? '0' : '') + minutes + ':' +
                (seconds < 10 ? '0' : '') + seconds;

            // Stop the timer when it reaches the total duration
            if (elapsedTime >= totalDuration) {
                clearInterval(interval);
                timerElement.textContent = "Time's up!";
            } else {
                elapsedTime++;
            }
        }

        // Start the interval to update the timer every second
        const interval = setInterval(updateTimer, 1000);

        // Run updateTimer immediately to show the initial time
        updateTimer();
    });
});
