import { useState, useCallback, useRef, useEffect } from 'react';
import { SortGenerator, SortStep } from '../engine/types';

export function usePlayback(generatorRef: React.MutableRefObject<SortGenerator | null>) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [currentStep, setCurrentStep] = useState<SortStep | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const step = useCallback(() => {
    if (!generatorRef.current) return;
    const result = generatorRef.current.next();
    if (result.done) {
      setIsPlaying(false);
      setIsFinished(true);
    } else {
      setCurrentStep(result.value);
    }
  }, [generatorRef]);

  const play = useCallback(() => {
    if (!isFinished) {
      setIsPlaying(true);
    }
  }, [isFinished]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const reset = useCallback((initialState: SortStep) => {
    pause();
    setIsFinished(false);
    setCurrentStep(initialState);
  }, [pause]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(step, speed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, step]);

  return { isPlaying, play, pause, step, speed, setSpeed, currentStep, isFinished, reset };
}
