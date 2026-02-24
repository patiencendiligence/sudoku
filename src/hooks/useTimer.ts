import { useState, useEffect, useCallback, useRef } from 'react';

export function useTimer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      if (pausedTimeRef.current > 0) {
        startTimeRef.current = Date.now() - pausedTimeRef.current;
      }
      intervalRef.current = window.setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const start = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    pausedTimeRef.current = 0;
    startTimeRef.current = Date.now();
    setElapsedTime(0);
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    const currentElapsed = startTimeRef.current > 0 ? Date.now() - startTimeRef.current : 0;
    pausedTimeRef.current = currentElapsed;
    setElapsedTime(currentElapsed);
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    let finalTime: number;
    if (pausedTimeRef.current > 0) {
      finalTime = pausedTimeRef.current;
    } else if (startTimeRef.current > 0) {
      finalTime = Date.now() - startTimeRef.current;
    } else {
      finalTime = elapsedTime;
    }
    setElapsedTime(finalTime);
    return finalTime;
  }, [elapsedTime]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setElapsedTime(0);
    pausedTimeRef.current = 0;
  }, []);

  return {
    elapsedTime,
    isRunning,
    start,
    pause,
    resume,
    stop,
    reset,
  };
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function formatBestTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  if (minutes > 0) {
    return `${minutes}분 ${seconds}초`;
  }
  return `${seconds}초`;
}
