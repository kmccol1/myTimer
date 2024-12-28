let startTime;
let updatedTime;
let difference;
let running = false;
let interval;
let elapsedTime = 0;

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const timerDisplay = document.getElementById("current-timer");

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - elapsedTime;
        interval = setInterval(updateTime, 1);
        startBtn.innerHTML = "Pause";
        stopBtn.disabled = false;
        running = true;
    } else {
        clearInterval(interval);
        startBtn.innerHTML = "Resume";
        elapsedTime = difference;
        running = false;
    }
}

function stopTimer() {
    clearInterval(interval);
    startBtn.innerHTML = "Start";
    stopBtn.disabled = true;
    running = false;
    elapsedTime = 0;  // Reset the stopwatch
    timerDisplay.innerHTML = "00:00:00.000";
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    timerDisplay.innerHTML = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

