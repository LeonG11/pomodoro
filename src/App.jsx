import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);

      if (sessionCount % 2 === 0) {
        setTimeLeft(5 * 60);
      } else {
        setTimeLeft(25 * 60);
      }
    }
  }, [timeLeft, sessionCount]);

  useEffect(() => {
    document.title = `${isRunning ? "Работа" : "Пауза"} ${Math.floor(
      timeLeft / 60
    )}:${(timeLeft % 60).toString().padStart(2, "0")}`;
  }, [timeLeft, isRunning]);

  const startTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setSessionCount(0);
  };

  const handleStartStopClick = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
      setSessionCount((prevCount) => prevCount + 1);
    }
  };
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={`main ${isRunning ? "main-change" : ""}`}>
      <button onClick={resetTimer}>Сброс</button>
      <div className={`circle ${isRunning ? "circle-change" : ""}`}>
        <div className="text">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
      </div>
      <button onClick={handleStartStopClick}>
        {isRunning ? "Пауза" : "Старт"}
      </button>
    </div>
  );
}

export default App;
