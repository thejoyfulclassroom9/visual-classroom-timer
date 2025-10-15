
import React from 'react';

interface TimerDisplayProps {
  totalSeconds: number;
  secondsRemaining: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ totalSeconds, secondsRemaining }) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const progress = totalSeconds > 0 ? (secondsRemaining / totalSeconds) : 0;
  const isFinished = secondsRemaining <= 0;
  
  const radius = 140;
  const stroke = 20;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  const getPathColor = () => {
    if (isFinished) return 'stroke-red-500';
    if (progress < 0.2) return 'stroke-orange-500';
    return 'stroke-cyan-400';
  };

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96">
      <svg
        height="100%"
        width="100%"
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        className="transform -rotate-90"
      >
        <circle
          stroke="#334155" // slate-700
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="currentColor"
          className={`transition-all duration-500 ease-linear ${getPathColor()}`}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset, strokeLinecap: 'round' }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        {isFinished ? (
          <span className="text-6xl md:text-7xl font-bold text-red-500 animate-pulse">
            Time's Up!
          </span>
        ) : (
          <>
            <span className="text-7xl md:text-8xl font-bold tabular-nums tracking-tighter">
              {formatTime(secondsRemaining)}
            </span>
            <span className="text-slate-400 text-lg">Remaining</span>
          </>
        )}
      </div>
    </div>
  );
};

export default TimerDisplay;
