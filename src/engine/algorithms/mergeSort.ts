import { SortStep } from '../types';

export function* mergeSort(arr: number[]): Generator<SortStep, void, unknown> {
  const array = [...arr];
  const n = array.length;
  
  function* merge(left: number, mid: number, right: number): Generator<SortStep, void, unknown> {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    const L = array.slice(left, mid + 1);
    const R = array.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
      yield { array: [...array], comparing: [left + i, mid + 1 + j] };
      if (L[i] <= R[j]) {
        array[k] = L[i];
        i++;
      } else {
        array[k] = R[j];
        j++;
      }
      yield { array: [...array], swapping: [k] };
      k++;
    }
    
    while (i < n1) {
      array[k] = L[i];
      yield { array: [...array], swapping: [k] };
      i++;
      k++;
    }
    
    while (j < n2) {
      array[k] = R[j];
      yield { array: [...array], swapping: [k] };
      j++;
      k++;
    }
  }

  function* mergeSortHelper(left: number, right: number): Generator<SortStep, void, unknown> {
    if (left >= right) return;
    const mid = left + Math.floor((right - left) / 2);
    yield* mergeSortHelper(left, mid);
    yield* mergeSortHelper(mid + 1, right);
    yield* merge(left, mid, right);
  }

  yield* mergeSortHelper(0, n - 1);
  yield { array: [...array], sorted: Array.from({ length: n }, (_, i) => i) };
}
