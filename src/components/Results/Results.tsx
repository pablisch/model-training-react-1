// import React from 'react';
import {
  NonNullTrainingData,
  NonNullTrainingIterationData,
  OrdinalIndicator,
  ReportingLevel,
  TrainingData,
  TrainingIterationData,
} from '../../types/types.ts'
import ResultsRow from './ResultsRow.tsx'
import './Results.css'
import { ORDINAL_INDICATOR } from '../../data/data.ts'

interface ResultsProps {
  trainingData: TrainingData
  isConverged: boolean
  convergenceThreshold: number
  reporting: ReportingLevel
}

const Results = ({
  trainingData,
  isConverged,
  convergenceThreshold,
  reporting,
}: ResultsProps) => {
  let lowestMseReductionIteration: NonNullTrainingIterationData | null = null
  let ordinalIndicator: OrdinalIndicator = ORDINAL_INDICATOR.nth

  if (!isConverged) {
    const isNonNullIteration = (
      row: TrainingIterationData
    ): row is NonNullTrainingIterationData =>
      row.mse !== null && row.mseReduction !== null

    const nonNullIterations: NonNullTrainingData =
      trainingData.filter(isNonNullIteration)

    if (nonNullIterations.length > 0) {
      lowestMseReductionIteration = nonNullIterations.reduce(
        (lowest, current) =>
          current.mseReduction < lowest.mseReduction ? current : lowest
      )
    }
    const lastIterationDigit =
      lowestMseReductionIteration !== null
        ? lowestMseReductionIteration.iteration % 10
        : 0
    ordinalIndicator =
      lastIterationDigit === 1
        ? ORDINAL_INDICATOR.first
        : lastIterationDigit === 2
          ? ORDINAL_INDICATOR.second
          : lastIterationDigit === 3
            ? ORDINAL_INDICATOR.third
            : ORDINAL_INDICATOR.nth
  }

  const resultConclusionMessage = (() => {
    const finalIteration = trainingData[trainingData.length - 1]
    if (
      isConverged &&
      finalIteration !== null &&
      finalIteration.mseReduction !== null
    ) {
      return `Converged after ${trainingData.length} iterations with an MSE reduction of ${finalIteration.mseReduction ? finalIteration.mseReduction.toFixed(4) : 'N/A'}`
    }
    if (lowestMseReductionIteration !== null) {
      return `The model did not converge after ${trainingData.length} iterations.\nThe convergence threshold was set to ${convergenceThreshold} and the lowest MSE reduction was ${lowestMseReductionIteration.mseReduction.toFixed(4)} on the ${lowestMseReductionIteration.iteration}${ordinalIndicator} iteration.`
    }

    return ''
  })()

  const resultsRows = (() => {
    if (reporting === 'full') {
      return trainingData.map(row => {
        return <ResultsRow key={row.iteration} rowData={row} />
      })
    } else if (reporting === 'verbose') {
      return trainingData.map(row => {
        return <ResultsRow key={row.iteration + 1} rowData={row} />
      })
    } else {
      return null
    }
  })()

  return (
    <div className="results-container">
      <div className="results-list-container">
        {trainingData.length > 0
          ? resultsRows
          : 'Click train to start training'}
      </div>
      <div className="result-conclusion">{resultConclusionMessage}</div>
    </div>
  )
}

export default Results
