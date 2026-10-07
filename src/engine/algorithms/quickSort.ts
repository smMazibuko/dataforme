import { SortStep } from '../types';

export function* quickSort(arr: number[]): Generator<SortStep, void, unknown> {
  const array = [...arr];
  const sorted: number[] = [];
  
  function* partition(low: number, high: number): Generator<SortStep, number, unknown> {
    const pivot = array[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      yield { array: [...array], comparing: [j, high], sorted: [...sorted] };
      if (array[j] < pivot) {
        i++;
        yield { array: [...array], comparing: [i, j], swapping: [i, j], sorted: [...sorted] };
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
    
    yield { array: [...array], comparing: [i + 1, high], swapping: [i + 1, high], sorted: [...sorted] };
    const temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    
    sorted.push(i + 1);
    return i + 1;
  }
  
  function* quickSortHelper(low: number, high: number): Generator<SortStep, void, unknown> {
    if (low < high) {
      const pi = yield* partition(low, high);
      yield* quickSortHelper(low, pi - 1);
      yield* quickSortHelper(pi + 1, high);
    } else if (low === high) {
      sorted.push(low);
    }
  }
  
  yield* quickSortHelper(0, array.length - 1);
  yield { array: [...array], sorted: Array.from({ length: array.length }, (_, i) => i) };
}
