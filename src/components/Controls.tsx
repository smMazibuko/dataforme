import React from 'react';

interface ControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  isFinished: boolean;
}

export function Controls({
  isPlaying,
  onPlay,
  onPause,
  onStep,
  onReset,
  speed,
  onSpeedChange,
  isFinished,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap gap-4 p-4 items-center bg-gray-50 dark:bg-gray-900 rounded justify-between mt-4 border border-gray-200 dark:border-gray-800">
      <div className="flex gap-2">
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={isPlaying ? onPause : onPlay}
          disabled={isFinished && !isPlaying}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button 
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
          onClick={onStep} 
          disabled={isPlaying || isFinished}
        >
          Step
        </button>
        <button 
          className="px-4 py-2 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Speed (ms):</label>
        <input
          type="range"
          min="10"
          max="1000"
          step="10"
          className="w-32"
          style={{ direction: 'rtl' }}
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
        />
        <span className="text-sm w-12 text-right">{speed}ms</span>
      </div>
    </div>
  );
}
