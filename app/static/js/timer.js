let stopwatchInterval = null;
let elapsedTime = 0;

document.addEventListener('DOMContentLoaded', () => {
  const stopwatchElement = document.getElementById('stopwatch-1');
  if (!stopwatchElement) return;

  startStopwatch(stopwatchElement);
});

function startStopwatch(element) {
  resetStopwatch(element);

  stopwatchInterval = setInterval(() => {
    elapsedTime += 100; // Increment by 100ms
    updateStopwatchDisplay(element, elapsedTime);
  }, 100);
}

function updateStopwatchDisplay(element, time) {
  const milliseconds = time % 1000;
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor(time / (1000 * 60 * 60));

  element.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function padMilliseconds(num) {
  return num.toString().padStart(3, '0');
}

function resetStopwatch(element) {
  clearInterval(stopwatchInterval);
  elapsedTime = 0;
  element.textContent = '00:00:00.000';
}

document.addEventListener('pauseStopwatch', () => {
  clearInterval(stopwatchInterval);
});

document.addEventListener('resumeStopwatch', () => {
  const stopwatchElement = document.getElementById('stopwatch-1');
  startStopwatch(stopwatchElement);
});

document.addEventListener('resetStopwatch', () => {
  const stopwatchElement = document.getElementById('stopwatch-1');
  resetStopwatch(stopwatchElement);
});
