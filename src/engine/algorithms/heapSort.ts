import { SortStep } from '../types';

export function* heapSort(arr: number[]): Generator<SortStep, void, unknown> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];

  function* heapify(n: number, i: number): Generator<SortStep, void, unknown> {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      yield { array: [...array], comparing: [left, largest], sorted: [...sorted] };
      if (array[left] > array[largest]) largest = left;
    }

    if (right < n) {
      yield { array: [...array], comparing: [right, largest], sorted: [...sorted] };
      if (array[right] > array[largest]) largest = right;
    }

    if (largest !== i) {
      yield { array: [...array], comparing: [i, largest], swapping: [i, largest], sorted: [...sorted] };
      const temp = array[i];
      array[i] = array[largest];
      array[largest] = temp;

      yield* heapify(n, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    yield { array: [...array], comparing: [0, i], swapping: [0, i], sorted: [...sorted] };
    const temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    sorted.push(i);

    yield* heapify(i, 0);
  }
  sorted.push(0);

  yield { array: [...array], sorted: Array.from({ length: n }, (_, i) => i) };
}
