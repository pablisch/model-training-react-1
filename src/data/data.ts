// interface Example {
//   feature: number;
//   label: number;
//   loss: number | null;
// }
//
// interface SampleData {
//   currentMse: number | null;
//   previousMse: number | null;
//   weight: number;
//   bias: number;
//   examples: Example[];
// }

import {InputData, TrainingIterationData} from "../types/types.ts";

export const inputDataExample1: InputData = [
  { feature: 3.5, label: 18 },
  { feature: 3.69, label: 15 },
  { feature: 3.44, label: 18 },
  { feature: 3.43, label: 16 },
  { feature: 4.34, label: 15 },
  { feature: 4.42, label: 14 },
  { feature: 2.37, label: 24 }
]

export const initialIterationData: TrainingIterationData = {
  mse: null,
  weight: 0,
  bias: 0,
  lossReduction: null,
};

// export const exampleOutputData: TrainingData = {
//   mse: 0,
//   previousMse: 0,
//   weight: 0,
//   bias: 0,
// };

export const REPORTING = {
  basic: "basic",
  verbose: "verbose",
  full: "full"
} as const;