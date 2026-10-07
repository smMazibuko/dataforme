import { SortStep } from '../types';

export function* insertionSort(arr: number[]): Generator<SortStep, void, unknown> {
  const array = [...arr];
  const sorted: number[] = [0];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    yield { array: [...array], comparing: [i, j], sorted: [...sorted] };

    while (j >= 0 && array[j] > key) {
      yield { array: [...array], comparing: [j, j + 1], swapping: [j, j + 1], sorted: [...sorted] };
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = key;
    sorted.push(i);
    yield { array: [...array], sorted: [...sorted] };
  }
  
  yield { array: [...array], sorted: Array.from({ length: n }, (_, i) => i) };
}
