import { inputDataExample1, initialIterationData } from '../data/data'
import {
  InputData,
  ReportingLevel,
  TrainingData,
  TrainingIterationData,
} from '../types/types.ts'

const inputData: InputData = inputDataExample1

// const defaultIterations = 3
// const defaultConvergenceThreshold = 0.001
// const defaultReporting = REPORTING.verbose

const train = (
  numOfIterations: number,
  convergenceThreshold: number,
  reporting: ReportingLevel
) => {
  const trainingData: TrainingData = [{ ...initialIterationData }]
  let converged = false
  console.log(
    'starting training',
    numOfIterations,
    convergenceThreshold,
    reporting,
    '...'
  )
  for (let i = 0; i < numOfIterations; i++) {
    const currentIterationData: TrainingIterationData =
      trainingData[trainingData.length - 1]
    currentIterationData.iteration = i + 1
    const nextIterationData: TrainingIterationData = { ...currentIterationData }
    const weight = currentIterationData.weight
    const bias = currentIterationData.bias
    const previousMse = i > 0 ? trainingData[i - 1].mse : null
    const losses = []
    for (let j = 0; j < inputData.length; j++) {
      const example = inputData[j]
      const prediction = weight * example.feature + bias
      losses.push(prediction - example.label)
    }
    const loss2 = losses.reduce((acc, curr) => acc + Math.pow(curr ?? 0, 2), 0)

    currentIterationData.mse = loss2 / inputData.length
    currentIterationData.mseReduction =
      previousMse !== null
        ? Math.abs(currentIterationData.mse - previousMse)
        : null

    if (
      currentIterationData.mseReduction !== null &&
      currentIterationData.mseReduction < convergenceThreshold
    ) {
      console.log(
        `Converged after ${i} iterations with MSE: ${currentIterationData.mse} and MSE reduction: ${currentIterationData.mseReduction}`
      )
      converged = true
      break
    }

    const weightDerivatives = losses.reduce(
      (acc, loss, index) => acc + (loss ?? 0) * inputData[index].feature * 2,
      0
    )
    const meanWeightDerivative = weightDerivatives / inputData.length
    nextIterationData.weight -= meanWeightDerivative * 0.01

    const biasDerivatives = losses.reduce(
      (acc, loss) => acc + (loss ?? 0) * 2,
      0
    )
    const meanBiasDerivative = biasDerivatives / inputData.length
    nextIterationData.bias -= meanBiasDerivative * 0.01

    if (i + 1 < numOfIterations) trainingData.push(nextIterationData)
  }

  return { trainingData: trainingData, converged: converged }
}

export { train }
