import { InputData, TrainingIterationData } from '../types/types.ts'

export const inputDataExample1: InputData = {
  featureLabel: 'weight/pounds(1000s)',
  labelLabel: 'mpg',
  data: [
    { feature: 3.5, label: 18 },
    { feature: 3.69, label: 15 },
    { feature: 3.44, label: 18 },
    { feature: 3.43, label: 16 },
    { feature: 4.34, label: 15 },
    { feature: 4.42, label: 14 },
    { feature: 2.37, label: 24 },
  ],
}

export const initialIterationData: TrainingIterationData = {
  mse: null,
  weight: 0,
  bias: 0,
  mseReduction: null,
  iteration: 1,
  selected: false,
}

export const REPORTING = {
  basic: 'basic',
  verbose: 'verbose',
  full: 'full',
} as const

export const ORDINAL_INDICATOR = {
  first: 'st',
  second: 'nd',
  third: 'rd',
  nth: 'th',
} as const
