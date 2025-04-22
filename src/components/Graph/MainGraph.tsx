// import React from 'react'
import { Graph } from './Graph.tsx'
import { InputData } from '../../types/types.ts'
import './Graph.css'

type GraphProps = {
  inputData: InputData
  weight: number
  bias: number
}

const MainGraph = ({ inputData, weight, bias }: GraphProps) => {
  return (
    <div className="main-graph-container">
      <Graph inputData={inputData} weight={weight} bias={bias} />
    </div>
  )
}

export default MainGraph
