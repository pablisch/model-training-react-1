import './App.css'
// import {train} from "./util/modelTraining.ts";
import Navbar from './components/Navbar/Navbar.tsx'
import { inputDataExample1, REPORTING } from './data/data.ts'
import { ReportingLevel, TrainingData, TrainingResult } from './types/types.ts'
import { useState } from 'react'
import * as React from 'react'
import { train } from './util/modelTraining.ts'
import Results from './components/Results/Results.tsx'
import MainGraph from './components/Graph/MainGraph.tsx'

// const data: InputData = sampleData
const defaultIterations: number = 10000
const defaultConvergenceThreshold: number = 0.001
const defaultReporting: ReportingLevel = REPORTING.verbose

function App() {
  const [isConverged, setIsConverged] = useState<boolean>(false)
  const [trainingData, setTrainingData] = useState<TrainingData>([])
  const [numOfIterations, setNumOfIterations] =
    useState<number>(defaultIterations)
  const [convergenceThreshold, setConvergenceThreshold] = useState<number>(
    defaultConvergenceThreshold
  )
  const [reporting, setReporting] = useState<ReportingLevel>(defaultReporting)

  const handleIterationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumOfIterations(Number(e.target.value))
  }

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConvergenceThreshold(Number(e.target.value))
  }

  const handleReportingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReporting(e.target.value as ReportingLevel)
  }

  const handleModelTraining = () => {
    const trainingResult: TrainingResult = train(
      numOfIterations,
      convergenceThreshold,
      reporting
    )
    setTrainingData(trainingResult.trainingData)
    setIsConverged(trainingResult.converged)
    console.log('Training data', trainingData)
  }

  return (
    <div className="App">
      <Navbar
        iterations={numOfIterations}
        setIterations={handleIterationsChange}
        threshold={convergenceThreshold}
        setThreshold={handleThresholdChange}
        reporting={reporting}
        setReportLevel={handleReportingChange}
        onTrain={handleModelTraining}
      />
      {trainingData.length > 0 && (
        <MainGraph
          inputData={inputDataExample1}
          weight={trainingData[trainingData.length - 1].weight}
          bias={trainingData[trainingData.length - 1].bias}
        />
      )}
      <Results
        trainingData={trainingData}
        isConverged={isConverged}
        convergenceThreshold={convergenceThreshold}
        reporting={reporting}
      />
      {/*<h2>Data and Regression Line</h2>*/}
    </div>
  )
}

export default App
