export type SortStep = {
  array: number[];
  comparing?: number[]; // indices of elements being compared
  swapping?: number[];  // indices of elements being swapped
  sorted?: number[];    // indices of elements known to be sorted
};

export type SortGenerator = Generator<SortStep, void, unknown>;

export interface Algorithm {
  name: string;
  generator: (array: number[]) => SortGenerator;
}
