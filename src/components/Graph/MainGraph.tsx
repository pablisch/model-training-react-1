// import React from 'react'
import { Graph } from './Graph.tsx'
import { InputData, TrainingData } from '../../types/types.ts'
import './Graph.css'

type GraphProps = {
  inputData: InputData
  trainingData: TrainingData
  weight: number
  bias: number
}

const MainGraph = ({ inputData, trainingData, weight, bias }: GraphProps) => {
  return (
    <div className="main-graph-container">
      <Graph
        inputData={inputData}
        trainingData={trainingData}
        weight={weight}
        bias={bias}
      />
    </div>
  )
}

export default MainGraph
