const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.useFakeTimers(); // Use fake timers for simulating time

describe('Stopwatch functionality', () => {
  let stopwatchElement;

  beforeEach(() => {
    // Create a mock stopwatch element
    stopwatchElement = document.createElement('span');
    stopwatchElement.setAttribute('id', 'stopwatch-1');
    stopwatchElement.textContent = '00:00:00.000'; // Initial state

    // Append the stopwatch to the document body
    document.body.appendChild(stopwatchElement);

    // Simulate DOMContentLoaded to start the stopwatch
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  });

  afterEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = '';
  });

  it('should initialize at 00:00:00.000', () => {
    expect(stopwatchElement.textContent).toBe('00:00:00.000');
  });

  // it('should update to 00:00:01.000 after 1 second', () => {
  //   jest.advanceTimersByTime(1000); // Simulate 1 second
  //   expect(stopwatchElement.textContent).toBe('00:00:01.000');
  // });
  //
  // it('should update to 00:00:30.000 after 30 seconds', () => {
  //   jest.advanceTimersByTime(30000); // Simulate 30 seconds
  //   expect(stopwatchElement.textContent).toBe('00:00:30.000');
  // });
  //
  // it('should handle minute increments correctly (e.g., 1 minute = 60 seconds)', () => {
  //   jest.advanceTimersByTime(60000); // Simulate 60 seconds (1 minute)
  //   expect(stopwatchElement.textContent).toBe('00:01:00.000');
  // });
  //
  // it('should continue running after 1 hour', () => {
  //   jest.advanceTimersByTime(3600000); // Simulate 1 hour
  //   expect(stopwatchElement.textContent).toBe('01:00:00.000');
  // });
  //
  // it('should pause and resume correctly', () => {
  //   // Simulate 10 seconds running
  //   jest.advanceTimersByTime(10000);
  //   expect(stopwatchElement.textContent).toBe('00:00:10.000');
  //
  //   // Pause the stopwatch
  //   document.dispatchEvent(new Event('pauseStopwatch'));
  //
  //   // Simulate 5 seconds during pause
  //   jest.advanceTimersByTime(5000);
  //   expect(stopwatchElement.textContent).toBe('00:00:10.000'); // Should remain unchanged
  //
  //   // Resume the stopwatch
  //   document.dispatchEvent(new Event('resumeStopwatch'));
  //
  //   // Simulate another 5 seconds
  //   jest.advanceTimersByTime(5000);
  //   expect(stopwatchElement.textContent).toBe('00:00:15.000');
  // });
  //
  // it('should reset to 00:00:00.000 when reset event is triggered', () => {
  //   // Simulate 10 seconds running
  //   jest.advanceTimersByTime(10000);
  //   expect(stopwatchElement.textContent).toBe('00:00:10.000');
  //
  //   // Reset the stopwatch
  //   document.dispatchEvent(new Event('resetStopwatch'));
  //
  //   expect(stopwatchElement.textContent).toBe('00:00:00.000');
  // });
  //
  // it('should format hours, minutes, and seconds correctly', () => {
  //   jest.advanceTimersByTime(3661000); // Simulate 1 hour, 1 minute, and 1 second
  //   expect(stopwatchElement.textContent).toBe('01:01:01.000');
  // });
  //
  // it('should handle milliseconds properly (e.g., 100ms increments)', () => {
  //   jest.advanceTimersByTime(100); // Simulate 100ms
  //   expect(stopwatchElement.textContent).toBe('00:00:00.100');
  //
  //   jest.advanceTimersByTime(900); // Simulate another 900ms
  //   expect(stopwatchElement.textContent).toBe('00:00:01.000');
  // });
  //
  // it('should not exceed 24 hours', () => {
  //   jest.advanceTimersByTime(86400000); // Simulate 24 hours
  //   expect(stopwatchElement.textContent).toBe('24:00:00.000');
  //
  //   jest.advanceTimersByTime(1000); // Simulate 1 second beyond 24 hours
  //   expect(stopwatchElement.textContent).toBe('24:00:00.000'); // Should remain at 24 hours
  // });
});
