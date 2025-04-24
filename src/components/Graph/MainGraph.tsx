// import React from 'react'
import { Graph } from './Graph.tsx'
import { InputData, TrainingData } from '../../types/types.ts'
import './Graph.css'

type GraphProps = {
  inputData: InputData
  trainingData: TrainingData
}

const MainGraph = ({ inputData, trainingData }: GraphProps) => {
  return (
    <div className="main-graph-container">
      <Graph inputData={inputData} trainingData={trainingData} />
    </div>
  )
}

export default MainGraph
