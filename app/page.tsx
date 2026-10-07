'use client';

import React, { useState, useEffect, useRef } from 'react';
import { algorithms } from '@/src/engine';
import { SortGenerator, SortStep } from '@/src/engine/types';
import { usePlayback } from '@/src/hooks/usePlayback';
import { BarChart } from '@/src/components/BarChart';
import { Controls } from '@/src/components/Controls';

const ARRAY_SIZE = 20;

function generateRandomArray(size: number) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);
}

export default function App() {
  const [array, setArray] = useState<number[]>([]);
  const [selectedAlgo, setSelectedAlgo] = useState<string>('bubbleSort');
  
  const generatorRef = useRef<SortGenerator | null>(null);

  const {
    isPlaying,
    play,
    pause,
    step,
    speed,
    setSpeed,
    currentStep,
    isFinished,
    reset: playbackReset
  } = usePlayback(generatorRef);

  useEffect(() => {
    initArray();
  }, []);

  const initArray = () => {
    const newArray = generateRandomArray(ARRAY_SIZE);
    setArray(newArray);
    
    const initialStep: SortStep = { array: newArray, sorted: [] };
    generatorRef.current = algorithms[selectedAlgo].generator([...newArray]);
    playbackReset(initialStep);
  };

  const handleAlgoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const algo = e.target.value;
    setSelectedAlgo(algo);
    
    const initialStep: SortStep = { array, sorted: [] };
    generatorRef.current = algorithms[algo].generator([...array]);
    playbackReset(initialStep);
  };

  return (
    <main className="max-w-4xl mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center tracking-tight">Algorithm Visualizer</h1>
      
      <div className="mb-6 flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <label className="font-medium text-sm">Algorithm:</label>
          <select 
            className="p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedAlgo} 
            onChange={handleAlgoChange}
            disabled={isPlaying}
          >
            {Object.entries(algorithms).map(([key, algo]) => (
              <option key={key} value={key}>{algo.name}</option>
            ))}
          </select>
        </div>
        
        <button 
          className="px-4 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 disabled:opacity-50 transition-colors"
          onClick={initArray}
          disabled={isPlaying}
        >
          Generate New Array
        </button>
      </div>
      
      <div className="border border-gray-200 dark:border-gray-800 rounded p-6 bg-white dark:bg-gray-950 shadow-sm">
        <BarChart step={currentStep} maxVal={110} />
      </div>
      
      <Controls 
        isPlaying={isPlaying}
        onPlay={play}
        onPause={pause}
        onStep={step}
        onReset={() => {
          generatorRef.current = algorithms[selectedAlgo].generator([...array]);
          playbackReset({ array, sorted: [] });
        }}
        speed={speed}
        onSpeedChange={setSpeed}
        isFinished={isFinished}
      />
      
      <div className="mt-8 text-sm text-gray-500 flex justify-center gap-6">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Default</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded-sm"></div> Comparing</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> Swapping</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-sm"></div> Sorted</div>
      </div>
    </main>
  );
}
