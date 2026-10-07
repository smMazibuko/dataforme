import React from 'react';
import { SortStep } from '../engine/types';

interface BarChartProps {
  step: SortStep | null;
  maxVal: number;
}

export function BarChart({ step, maxVal }: BarChartProps) {
  if (!step) return <div className="h-64 w-full bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-gray-400">No data</div>;

  return (
    <div className="flex items-end gap-1 h-64 w-full justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
      {step.array.map((value, idx) => {
        let color = 'bg-blue-500'; // default
        if (step.comparing?.includes(idx)) color = 'bg-yellow-400';
        if (step.swapping?.includes(idx)) color = 'bg-red-500';
        if (step.sorted?.includes(idx)) color = 'bg-green-500';

        const heightPercentage = maxVal > 0 ? (value / maxVal) * 100 : 0;

        return (
          <div
            key={idx}
            className={`${color} w-6 transition-all duration-100 rounded-t`}
            style={{ height: `${heightPercentage}%` }}
          />
        );
      })}
    </div>
  );
}
