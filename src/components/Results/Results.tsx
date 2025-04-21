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
import { ORDINAL_INDICATOR, REPORTING } from '../../data/data.ts'

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
      return (
        <>
          Converged after <strong>{trainingData.length}</strong> iterations with
          an <strong>MSE reduction</strong> of{' '}
          <strong>{finalIteration.mseReduction.toFixed(7)}</strong>.
        </>
      )
    }

    if (lowestMseReductionIteration !== null) {
      return (
        <>
          The model did <strong>not</strong> converge after{' '}
          <strong>{trainingData.length}</strong> iterations.
          <br />
          The <strong>convergence threshold</strong> was set to{' '}
          <strong>{convergenceThreshold}</strong> and the lowest{' '}
          <strong>MSE reduction</strong> was{' '}
          <strong>{lowestMseReductionIteration.mseReduction.toFixed(7)}</strong>{' '}
          on the{' '}
          <strong>
            {lowestMseReductionIteration.iteration}
            {ordinalIndicator}
          </strong>{' '}
          iteration.
        </>
      )
    }

    return ''
  })()

  const resultsRows = (() => {
    if (reporting === REPORTING.full) {
      return trainingData.map(row => {
        return <ResultsRow key={row.iteration} rowData={row} />
      })
    } else if (reporting === REPORTING.verbose) {
      const firstIterations = trainingData.slice(0, 10)
      const lastIterations = trainingData.slice(-25)
      const totalIterations = trainingData.length

      // If there are more than 25 iterations, add ellipses in the middle
      if (totalIterations > 40) {
        return (
          <>
            {firstIterations.map(row => (
              <ResultsRow key={row.iteration} rowData={row} />
            ))}
            <div className="ellipsis">
              ... set reporting to <strong>Full</strong> to see every iteration
            </div>
            {lastIterations.map(row => (
              <ResultsRow key={row.iteration} rowData={row} />
            ))}
          </>
        )
      } else {
        return trainingData.map(row => {
          return <ResultsRow key={row.iteration} rowData={row} />
        })
      }
    } else {
      return null
    }
  })()

  return (
    <div className="results-container">
      <div className="result-conclusion">{resultConclusionMessage}</div>
      <div className="results-list-container">
        {trainingData.length > 0
          ? resultsRows
          : 'Click train to start training'}
      </div>
    </div>
  )
}

export default Results
