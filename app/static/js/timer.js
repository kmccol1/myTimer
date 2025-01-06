let startTime;
let updatedTime;
let difference;
let running = false;
let interval;
let elapsedTime = 0;
let countdownMode = false;
let countdownEndTime;

let storageAvailable = true;
let fallbackStorage = []; // Fallback for incognito mode



const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const timerDisplay = document.getElementById("current-timer");

function startTimer()
{
    if (!running)
    {
        if (!countdownMode)
        {
            // Regular stopwatch functionality
            startTime = new Date().getTime() - elapsedTime;
        }
        interval = setInterval(updateTime, 1);
        startBtn.innerHTML = "Pause";
        stopBtn.disabled = false;
        running = true;
    }
    else
    {
        clearInterval(interval);
        startBtn.innerHTML = "Resume";
        elapsedTime = difference;
        running = false;
    }
}

function setTimer(seconds)
{
    if (running)
    {
        clearInterval(interval);
    }
    countdownMode = true;
    countdownEndTime = new Date().getTime() + seconds * 1000; // Set the end time for the countdown
    updateTime(seconds * 1000); // Immediately update display
    startBtn.innerHTML = "Pause";
    stopBtn.disabled = false;
    running = true;
    interval = setInterval(updateTime, 1); // Start countdown
}

function stopTimer()
{
    clearInterval(interval);
    startBtn.innerHTML = "Start";
    stopBtn.disabled = true;
    running = false;
    elapsedTime = 0; // Reset the stopwatch
    countdownMode = false; // Exit countdown mode
    timerDisplay.innerHTML = "00:00:00.000";
}

// Updated Countdown Completion Logic
function updateTime(timerDuration = null)
{
    let displayTime;

    if (countdownMode)
    {
        const currentTime = new Date().getTime();
        const timeRemaining = countdownEndTime - currentTime;

        if (timeRemaining <= 0)
        {
            clearInterval(interval);
            timerDisplay.innerHTML = "00:00:00.000";
            savePastTimer(timerDuration || elapsedTime); // Save completed timer
            alert("Time's up!");
            running = false;
            countdownMode = false;
            startBtn.innerHTML = "Start";
            stopBtn.disabled = true;
            return;
        }

        displayTime = timeRemaining;
    }
    else if (timerDuration !== null)
    {
        displayTime = timerDuration;
    }
    else
    {
        const updatedTime = new Date().getTime();
        difference = updatedTime - startTime;
        displayTime = difference;
    }

    const hours = Math.floor((displayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((displayTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((displayTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((displayTime % 1000) / 10);

    const formattedHours = (hours < 10) ? "0" + hours : hours;
    const formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;
    const formattedSeconds = (seconds < 10) ? "0" + seconds : seconds;
    const formattedMilliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    timerDisplay.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}

function savePastTimer(duration = null)
{
    const timerToSave = duration !== null ? duration : elapsedTime;

    console.log("Saving timer:", timerToSave);
    if (storageAvailable)
    {
        const pastTimers = JSON.parse(localStorage.getItem("pastTimers")) || [];
        pastTimers.push(timerToSave);
        console.log("Updated pastTimers:", pastTimers);
        localStorage.setItem("pastTimers", JSON.stringify(pastTimers));
    }
    else
    {
        fallbackStorage.push(timerToSave);
        console.log("Fallback storage used:", fallbackStorage);
    }

    updatePastTimersDisplay();
}

function updatePastTimersDisplay()
{
    const pastTimers = storageAvailable
        ? JSON.parse(localStorage.getItem("pastTimers")) || []
        : fallbackStorage;

    const pastTimersList = document.getElementById("past-timers");
    pastTimersList.innerHTML = ""; // Clear existing entries

    if (pastTimers.length === 0)
    {
        const li = document.createElement("li");
        li.textContent = "No past timers yet.";
        pastTimersList.appendChild(li);
        return;
    }

    pastTimers.forEach((timer, index) => {
        const li = document.createElement("li");
        li.textContent = `Timer #${index + 1} (${formatTime(timer)})`;
        pastTimersList.appendChild(li);
    });
}

function formatTime(milliseconds)
{
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours > 0 ? `${hours}h ` : "";
    const formattedMinutes = minutes > 0 ? `${minutes}m ` : "";
    const formattedSeconds = seconds > 0 ? `${seconds}s` : "";

    return `${formattedHours}${formattedMinutes}${formattedSeconds}`.trim();
}

// Check if local storage is available
try
{
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
}
catch (e)
{
    storageAvailable = false;
}

// Load past timers on page load

window.onload = () => {
    console.log("Loaded timers from storage:", localStorage.getItem("pastTimers"));
    updatePastTimersDisplay();
};

