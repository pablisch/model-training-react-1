interface Example {
  feature: number;
  label: number;
}

export type InputData = Example[]

export interface TrainingIterationData {
  // examples: { feature: number; label: number; loss: number | null }[];
  weight: number;
  bias: number;
  mse: number | null;
  // previousMse: number | null;
  lossReduction: number | null;
}

export type TrainingData = TrainingIterationData[]

export type ReportingLevel = "basic" | "verbose" | "full"
