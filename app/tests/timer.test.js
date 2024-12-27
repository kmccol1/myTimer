const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.useFakeTimers(); // Use fake timers for simulating time

describe('Timer functionality', () => {
  let timerElement;
  let timerElement2;

  beforeEach(() => {
    // Create a mock timer element with initial text content
    timerElement = document.createElement('span');
    timerElement.setAttribute('id', 'timer-1');
    timerElement.setAttribute('data-duration', '10'); // Set duration to 10 seconds
    timerElement.textContent = '00:00:00';

    timerElement2 = document.createElement('span');
    timerElement2.setAttribute('id', 'timer-2');
    timerElement2.setAttribute('data-duration', '5'); // Set duration to 5 seconds
    timerElement2.textContent = '00:00:00';

    // Append the timer elements to the document body to simulate real DOM behavior
    document.body.appendChild(timerElement);
    document.body.appendChild(timerElement2);

    // Simulate the DOMContentLoaded event to trigger the timer setup
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  });

  afterEach(() => {
    // Clean up after each test
    document.body.innerHTML = '';
  });

  it('should initialize timer at 00:00:00', () => {
    expect(timerElement.textContent).toBe('00:00:00');
  });

  it('should update the timer correctly after 10 seconds', () => {
    // Simulate 10 seconds passing
    jest.advanceTimersByTime(10000); // 10 seconds

    // After 10 seconds, the timer should display 00:00:10
    expect(timerElement.textContent).toBe('00:00:10');
  });

  it('should display "Time\'s up!" after the timer reaches its duration', () => {
    // Simulate the timer running to completion (10 seconds)
    jest.advanceTimersByTime(10000); // 10 seconds

    // The text content should change to "Time's up!"
    expect(timerElement.textContent).toBe("Time's up!");
  });

  it('should not update if duration is invalid', () => {
    // Set an invalid duration (non-numeric)
    timerElement.setAttribute('data-duration', 'invalid');

    // Trigger DOMContentLoaded again to handle the invalid duration
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    // The timer should display "Invalid timer"
    expect(timerElement.textContent).toBe("Invalid timer");
  });

  it('should handle duration of 0', () => {
    // Set a duration of 0
    timerElement.setAttribute('data-duration', '0');

    // Trigger DOMContentLoaded again
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    // The timer should display "Invalid timer" as 0 seconds is not a valid duration
    expect(timerElement.textContent).toBe("Invalid timer");
  });

  it('should handle multiple timers running concurrently', () => {
    // Simulate the DOMContentLoaded event for both timers
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    // Advance timers by 5 seconds
    jest.advanceTimersByTime(5000); // 5 seconds

    // Timer 1 should show 00:00:05 and timer 2 should show "Time's up!"
    expect(timerElement.textContent).toBe('00:00:05');
    expect(timerElement2.textContent).toBe("Time's up!");

    // Clean up after the test
    document.body.innerHTML = '';
  });

  it('should handle non-integer durations gracefully', () => {
    // Set a duration with a float value
    timerElement.setAttribute('data-duration', '10.5'); // 10.5 seconds

    // Trigger the DOMContentLoaded event
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    // Simulate 10.5 seconds passing (rounded to 10 seconds)
    jest.advanceTimersByTime(10500); // 10.5 seconds

    // The timer should show 00:00:10 and then "Time's up!"
    expect(timerElement.textContent).toBe("Time's up!");
  });
});
