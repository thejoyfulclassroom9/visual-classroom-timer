
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ALARM_SOUND_B64 } from '../constants';

const useTimer = (totalSeconds: number, onTimerEnd: () => void) => {
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerId = useRef<number | null>(null);
  
  const alarmAudio = useMemo(() => {
    if (typeof Audio !== 'undefined') {
      return new Audio(ALARM_SOUND_B64);
    }
    return null;
  }, []);
  
  useEffect(() => {
    setSecondsRemaining(totalSeconds);
    setIsActive(false);
    setIsFinished(false);
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  }, [totalSeconds]);

  useEffect(() => {
    if (isActive && secondsRemaining > 0) {
      timerId.current = window.setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining <= 0 && isActive) {
      if (alarmAudio) {
          alarmAudio.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsActive(false);
      setIsFinished(true);
      if (timerId.current) {
          clearInterval(timerId.current);
          timerId.current = null;
      }
      // Optional: auto-reset after a delay
      // setTimeout(() => {
      //   onTimerEnd();
      // }, 3000);
    }

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, secondsRemaining, alarmAudio]);

  const start = useCallback(() => {
    if (isFinished) {
      return;
    }
    if(alarmAudio && alarmAudio.paused) {
        // This pre-loads the audio on user interaction, which is good practice for browsers
        alarmAudio.load();
    }
    setIsActive(true);
  }, [isFinished, alarmAudio]);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
    setSecondsRemaining(totalSeconds);
    setIsFinished(false);
  }, [totalSeconds]);

  return { secondsRemaining, isActive, isFinished, start, pause, reset };
};

export default useTimer;
