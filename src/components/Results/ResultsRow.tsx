// import React from 'react';
import { TrainingIterationData } from '../../types/types.ts'

interface ResultsRowProps {
  rowData: TrainingIterationData
}

const ResultsRow = ({ rowData }: ResultsRowProps) => {
  return (
    <div>
      {`id: ${rowData.iteration}, - mse: ${rowData.mse ? rowData.mse.toFixed(2) : 'N/A'}, - mseReduction: ${rowData.mseReduction ? rowData.mseReduction.toFixed(2) : 'N/A'}, - weight: ${rowData.weight.toFixed(2)}, - bias: ${rowData.bias.toFixed(2)}`}
    </div>
  )
}

export default ResultsRow
