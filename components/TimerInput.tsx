
import React, { useState } from 'react';

interface TimerInputProps {
  onSetTimer: (seconds: number) => void;
}

const TimerInput: React.FC<TimerInputProps> = ({ onSetTimer }) => {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (Number(value) <= 999) {
      setMinutes(value);
    }
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (Number(value) < 60) {
      setSeconds(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const totalSeconds = (Number(minutes) || 0) * 60 + (Number(seconds) || 0);
    if (totalSeconds > 0) {
      onSetTimer(totalSeconds);
    }
  };

  return (
    <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-center text-slate-200">Set Timer Duration</h2>
        <div className="flex justify-center gap-4">
          <div>
            <label htmlFor="minutes" className="block text-sm font-medium text-slate-400 mb-2">Minutes</label>
            <input
              id="minutes"
              type="tel"
              value={minutes}
              onChange={handleMinutesChange}
              placeholder="00"
              className="w-24 h-24 text-5xl text-center bg-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              autoFocus
            />
          </div>
          <span className="text-5xl text-slate-500 self-end mb-7">:</span>
          <div>
            <label htmlFor="seconds" className="block text-sm font-medium text-slate-400 mb-2">Seconds</label>
            <input
              id="seconds"
              type="tel"
              value={seconds}
              onChange={handleSecondsChange}
              placeholder="00"
              className="w-24 h-24 text-5xl text-center bg-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 text-lg shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed"
          disabled={!minutes && !seconds}
        >
          Start Timer
        </button>
      </form>
    </div>
  );
};

export default TimerInput;
