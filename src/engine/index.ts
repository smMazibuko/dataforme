import { Algorithm } from './types';
import { bubbleSort } from './algorithms/bubbleSort';
import { insertionSort } from './algorithms/insertionSort';
import { mergeSort } from './algorithms/mergeSort';
import { quickSort } from './algorithms/quickSort';
import { heapSort } from './algorithms/heapSort';

export const algorithms: Record<string, Algorithm> = {
  bubbleSort: { name: 'Bubble Sort', generator: bubbleSort },
  insertionSort: { name: 'Insertion Sort', generator: insertionSort },
  mergeSort: { name: 'Merge Sort', generator: mergeSort },
  quickSort: { name: 'Quick Sort', generator: quickSort },
  heapSort: { name: 'Heap Sort', generator: heapSort },
};

export * from './types';
