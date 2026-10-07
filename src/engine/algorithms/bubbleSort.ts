import { SortStep } from '../types';

export function* bubbleSort(arr: number[]): Generator<SortStep, void, unknown> {
  const array = [...arr];
  const sorted: number[] = [];
  const n = array.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { array: [...array], comparing: [j, j + 1], sorted: [...sorted] };
      
      if (array[j] > array[j + 1]) {
        yield { array: [...array], comparing: [j, j + 1], swapping: [j, j + 1], sorted: [...sorted] };
        
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        
        yield { array: [...array], sorted: [...sorted] };
      }
    }
    sorted.push(n - i - 1);
  }
  
  yield { array: [...array], sorted: Array.from({ length: n }, (_, i) => i) };
}
