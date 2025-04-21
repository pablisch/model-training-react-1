// import React from 'react';
import {
  NonNullTrainingData,
  NonNullTrainingIterationData, OrdinalIndicator,
  TrainingData,
  TrainingIterationData
} from "../../types/types.ts";
import ResultsRow from "./ResultsRow.tsx";
import './Results.css';
import {ORDINAL_INDICATOR} from "../../data/data.ts";

interface ResultsProps {
  trainingData: TrainingData;
  isConverged: boolean;
  convergenceThreshold: number;
}

const Results = ({trainingData, isConverged, convergenceThreshold}: ResultsProps) => {
  let lowestMseReductionIteration: NonNullTrainingIterationData | null = null;
  let ordinalIndicator: OrdinalIndicator = ORDINAL_INDICATOR.nth
  
  if (!isConverged) {
    const isNonNullIteration = (row: TrainingIterationData): row is NonNullTrainingIterationData =>
      row.mse !== null && row.mseReduction !== null;
    
    const nonNullIterations: NonNullTrainingData = trainingData.filter(isNonNullIteration);
    
    if (nonNullIterations.length > 0) {
      lowestMseReductionIteration = nonNullIterations.reduce((lowest, current) =>
        current.mseReduction < lowest.mseReduction ? current : lowest
      );
    }
    const lastIterationDigit = lowestMseReductionIteration !== null ? lowestMseReductionIteration.iteration % 10 : 0;
    ordinalIndicator = lastIterationDigit === 1 ? ORDINAL_INDICATOR.first :
      lastIterationDigit === 2 ? ORDINAL_INDICATOR.second :
        lastIterationDigit === 3 ? ORDINAL_INDICATOR.third : ORDINAL_INDICATOR.nth;
  }
  
  return (
      <div className="results-container">
        {trainingData.length > 0 ? trainingData.map((row) => {
          return <ResultsRow key={row.iteration} rowData={row} />
        }) : "Click train to start training"}
        <div className="result-conclusion">
        
        {isConverged && trainingData.length > 0  ? "Converged" : lowestMseReductionIteration !== null ? `The model did not converge after ${trainingData.length} iterations.\nThe convergence threshold was set to ${convergenceThreshold} and the lowest MSE reduction was ${lowestMseReductionIteration.mseReduction.toFixed(4)} on the ${lowestMseReductionIteration.iteration}${ordinalIndicator} iteration.` : ""}
      </div>
        </div>
  );
};

export default Results;
