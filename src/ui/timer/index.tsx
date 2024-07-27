import React, { useState, useEffect, useRef } from "react";
import { Wheel } from "../wheel";
import { WheelInfo } from "../../components";
import { usePlayerContext } from "../../provider/PlayerContext";
import "./style.css";

const INITIALSECONDS = 90

export const CountdownTimer: React.FC = () => {
  const initialMilliseconds = INITIALSECONDS * 1000;
  const [milliseconds, setMilliseconds] = useState(initialMilliseconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const { setWinner, setStatus, status, players} = usePlayerContext();


  useEffect(() => {
    if (isActive && milliseconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setMilliseconds((prevMilliseconds) =>
          Math.max(prevMilliseconds - 100, 0)
        );
      }, 100);
    } else if (!isActive || milliseconds <= 0) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      if (milliseconds === 0) {
        startSpin();
        setStatus('progress')
      }
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, milliseconds]);

  const startTimer = () => {
    setIsActive(true);
  };


  useEffect(() => {
    if(players.length > 1) {
        setMilliseconds(INITIALSECONDS * 1000)
        setStatus('pending')
        startTimer()
    }

  },[players,players.length])

  const startSpin = () => {
    const sliceWrapper = document.querySelector(".sliceWrapper");
    if (sliceWrapper) {
      sliceWrapper.classList.add("spin");
    }
    timeoutRef.current = window.setTimeout(() => {
      stopSpin();
    }, 10000);
  };

  const stopSpin = () => {
    const sliceWrapper = document.querySelector(".sliceWrapper");
    const rndInt = Math.floor(Math.random() * 36) + 1;
    const finalRotation = rndInt * 10;

    if (sliceWrapper) {
      sliceWrapper.classList.remove("spin");
    }
    sliceWrapper?.setAttribute(
      "style",
      `transform: rotate(${finalRotation}deg)`
    );
    calculateWinner(finalRotation);
  };

  const calculateWinner = (finalRotation: number) => {
    let cumulativePercent = 0;
    const rotatedAngle = finalRotation % 360;
    const adjustedAngle = (360 - rotatedAngle) % 360;

    for (const player of players) {
      const slicePercent = parseFloat(player.percent);
      cumulativePercent += slicePercent;
      const sliceEndAngle = cumulativePercent * 3.6;

      if (adjustedAngle <= sliceEndAngle) {
        setWinner(player)
        setStatus('done')
        break;
      }
    }
  };


  const seconds = Math.ceil(milliseconds / 1000);
  const percentage = (milliseconds / initialMilliseconds) * 100;

  const getDashArray = (): string => {
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    return `${circumference}`;
  };

  const getDashOffset = (percentage: number): string => {
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    return `${(percentage / 100) * circumference}`;
  };

  return (
    <div className="timer-wrapper">
      <div className="timer">
        <div className="timer-input">
          {players.length > 1 ? seconds : "-:--"}
        </div>
      </div>
      <div
        style={{
          width: "410px",
          height: "360px",
          margin: "auto",
          textAlign: "center",
          position: "relative",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className="progress-ring"
        >
          <circle
            className="progress-ring__circle"
            stroke="#2C2F3F"
            strokeWidth="5"
            fill="transparent"
            r="90"
            cx="100"
            cy="100"
          />
          <circle
            className="progress-ring__circle--progress"
            stroke="#EAE1D5" 
            strokeWidth="5"
            fill="transparent"
            r="90"
            cx="100"
            cy="100"
            style={{
              strokeDasharray: getDashArray(),
              strokeDashoffset: getDashOffset(percentage),
            }}
          />
        </svg>
        <Wheel />
        <WheelInfo/>
        {status === 'progress' || status === 'done' ?  <div className="arrow"></div> : <></> }
      </div>
    </div>
  );
};

