interface Example {
  feature: number;
  label: number;
}

export type InputData = Example[]

export interface TrainingIterationData {
  weight: number;
  bias: number;
  mse: number | null;
  mseReduction: number | null;
  iteration: number;
  selected: boolean;
}

export type TrainingData = TrainingIterationData[]

export type ReportingLevel = "basic" | "verbose" | "full"
