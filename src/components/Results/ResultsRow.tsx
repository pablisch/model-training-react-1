// import React from 'react';
import { TrainingIterationData } from '../../types/types.ts'
import './Results.css'
import '../../../global.css'

interface ResultsRowProps {
  rowData: TrainingIterationData
}

const ResultsRow = ({ rowData }: ResultsRowProps) => {
  return (
    <div
      className={`result-row-container ${rowData.iteration % 2 === 0 ? 'even-row' : ''}`}
    >
      <div className={`result-row-section iteration-section`}>
        
        <p>Iteration:</p>
        <p>
          <strong>{rowData.iteration}</strong>
        </p>
      </div>
      <div className={`result-row-section mse-section`}>
        <p>MSE:</p>
        <p>
          <strong>{rowData.mse ? rowData.mse.toFixed(2) : 'N/A'}</strong>
        </p>
      </div>
      <div className={`result-row-section weight-section`}>
        <p>Weight:</p>
        <p>
          <strong>{rowData.weight.toFixed(2)}</strong>
        </p>
      </div>
      <div className={`result-row-section bias-section`}>
        <p>Bias:</p>
        <p>
          <strong>{rowData.bias.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  )
}

export default ResultsRow
