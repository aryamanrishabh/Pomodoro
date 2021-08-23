import React, { useState, useEffect } from "react";

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [counter, setCounter] = useState(1800);
  const [sessions, setSessions] = useState(1);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    } else if (!started && counter !== 0) {
      clearInterval(interval);
    }
    if (finished) {
      clearInterval(interval);
    }
    if (counter === 0) {
      clearInterval(interval);
      setFinished(true);
    }
    return () => clearInterval(interval);
  }, [started, counter]);

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        clearInterval(interval);

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let minutes = displayMessage ? 24 : 4;
            let seconds = 59;

            setSeconds(seconds);
            setMinutes(minutes);
            setDisplayMessage(!displayMessage);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!started && seconds !== 0) {
      clearInterval(interval);
    }
    if (finished) {
      clearInterval(interval);
    }
  }, [started, seconds]);

  const startSession = () => {
    setStarted(true);
    setCounter(counter * parseInt(sessions));
  };

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div>
      <form
        className="form-group"
        onSubmit={(e) => {
          e.preventDefault();
          startSession();
        }}
      >
        <input
          id="input"
          placeholder="sessions"
          value={sessions}
          onChange={(e) => setSessions(e.target.value)}
        />
        <button className="btn btn-warning m-2">Start</button>
      </form>
      <div className="message display-3">
        {displayMessage && <div>Break time! New session starts in:</div>}
      </div>
      <div className="display-1">
        {timerMinutes}:{timerSeconds}
      </div>
    </div>
  );
};

export default Pomodoro;
