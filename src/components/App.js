import React, { useState, useRef, useEffect } from "react";
import "./../styles/App.css";

const App = () => {
  // --- State Variables ---
  const [time, setTime] = useState(0); // in centiseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  // --- useRef for the interval ---
  const timerRef = useRef(null);

  // --- Start the timer ---
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10); // 10 ms = 1 centisecond
    }
  };

  // --- Stop the timer ---
  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  // --- Record a lap ---
  const recordLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  // --- Reset the timer ---
  const resetTimer = () => {
    stopTimer();
    setTime(0);
    setLaps([]);
  };

  // --- Cleanup when component unmounts ---
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // --- Format time into mm:ss:cs ---
  const formatTime = (centiseconds) => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;

    const pad = (num) => num.toString().padStart(2, "0");
    return `${pad(minutes)}:${pad(seconds)}:${pad(cs)}`;
  };

  return (
    <div id="main">
      <h1>Lap Timer</h1>

      <div className="timer-display">
        <h2>{formatTime(time)}</h2>
      </div>

      <div className="controls">
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={stopTimer}>Stop</button>
        )}
        <button onClick={recordLap}>Lap</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      <div className="laps">
        <h3>Laps:</h3>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>
              Lap {index + 1}: {formatTime(lap)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
