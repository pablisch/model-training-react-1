interface Example {
  feature: number
  label: number
}

export type InputData = Example[]

export interface TrainingIterationData {
  weight: number
  bias: number
  mse: number | null
  mseReduction: number | null
  iteration: number
  selected: boolean
}

export type TrainingData = TrainingIterationData[]

export interface NonNullTrainingIterationData {
  weight: number
  bias: number
  mse: number
  mseReduction: number
  iteration: number
  selected: boolean
}

export type NonNullTrainingData = NonNullTrainingIterationData[]

export type ReportingLevel = 'basic' | 'verbose' | 'full'

export interface TrainingResult {
  trainingData: TrainingData
  converged: boolean
}

export type OrdinalIndicator = 'st' | 'nd' | 'rd' | 'th'
