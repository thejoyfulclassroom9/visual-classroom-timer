
import React, { useState, useCallback } from 'react';
import TimerInput from './components/TimerInput';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import useTimer from './hooks/useTimer';
import { ALARM_SOUND_B64 } from './constants';

const App: React.FC = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);

  const handleSetTimer = (seconds: number) => {
    if (seconds > 0) {
      setTotalSeconds(seconds);
    }
  };

  const handleResetTimer = useCallback(() => {
    setTotalSeconds(0);
  }, []);

  const {
    secondsRemaining,
    isActive,
    isFinished,
    start,
    pause,
    reset: resetCountdown,
  } = useTimer(totalSeconds, handleResetTimer);

  const handleFullReset = () => {
    handleResetTimer();
    resetCountdown();
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center font-sans p-4">
      <header className="w-full max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">Visual Classroom Timer</h1>
        <p className="text-slate-400 mt-2">A simple tool to help students manage their time effectively.</p>
      </header>

      <main className="w-full max-w-2xl mx-auto flex-grow flex items-center justify-center">
        {totalSeconds === 0 ? (
          <TimerInput onSetTimer={handleSetTimer} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-8 w-full">
            <TimerDisplay
              totalSeconds={totalSeconds}
              secondsRemaining={secondsRemaining}
            />
            <TimerControls
              isActive={isActive}
              isFinished={isFinished}
              onStart={start}
              onPause={pause}
              onReset={handleFullReset}
            />
          </div>
        )}
      </main>

      <footer className="w-full text-center p-4 text-slate-500 text-sm">
        <p>Designed for classroom focus. Embed this on your Google Site for easy access.</p>
      </footer>
    </div>
  );
};

export default App;
