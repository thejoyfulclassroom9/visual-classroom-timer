
import React from 'react';
import { PlayIcon, PauseIcon, ResetIcon } from './icons';

interface TimerControlsProps {
  isActive: boolean;
  isFinished: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const ControlButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  ariaLabel: string;
}> = ({ onClick, children, className = '', disabled = false, ariaLabel }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={`flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${className} ${
      disabled ? 'bg-slate-600 text-slate-400 cursor-not-allowed' : ''
    }`}
  >
    {children}
  </button>
);


const TimerControls: React.FC<TimerControlsProps> = ({
  isActive,
  isFinished,
  onStart,
  onPause,
  onReset,
}) => {
  return (
    <div className="flex items-center gap-4">
      <ControlButton
        onClick={onReset}
        className="bg-slate-600 hover:bg-slate-500 text-white focus:ring-slate-400"
        ariaLabel="Reset timer"
      >
        <ResetIcon className="w-6 h-6" />
        Reset
      </ControlButton>

      {!isActive ? (
        <ControlButton
          onClick={onStart}
          disabled={isFinished}
          className="bg-green-600 hover:bg-green-500 text-white focus:ring-green-400 w-40"
          ariaLabel="Start timer"
        >
          <PlayIcon className="w-6 h-6" />
          Start
        </ControlButton>
      ) : (
        <ControlButton
          onClick={onPause}
          className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 focus:ring-yellow-300 w-40"
          ariaLabel="Pause timer"
        >
          <PauseIcon className="w-6 h-6" />
          Pause
        </ControlButton>
      )}
    </div>
  );
};

export default TimerControls;
