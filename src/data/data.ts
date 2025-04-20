interface Example {
  feature: number;
  label: number;
  loss: number | null;
}

interface SampleData {
  currentMse: number | null;
  previousMse: number | null;
  weight: number;
  bias: number;
  examples: Example[];
}

type ReportingLevel = "basic" | "verbose" | "full";

export const sampleData: SampleData = {
  currentMse: null,
  previousMse: null,
  weight: 0,
  bias: 0,
  examples: [
    { feature: 3.5, label: 18, loss: null },
    { feature: 3.69, label: 15, loss: null },
    { feature: 3.44, label: 18, loss: null },
    { feature: 3.43, label: 16, loss: null },
    { feature: 4.34, label: 15, loss: null },
    { feature: 4.42, label: 14, loss: null },
    { feature: 2.37, label: 24, loss: null }
  ]
};

export const REPORTING: Record<ReportingLevel, ReportingLevel> = {
  basic: "basic",
  verbose: "verbose",
  full: "full"
};