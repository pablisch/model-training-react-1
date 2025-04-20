import './App.css'
// import {train} from "./util/modelTraining.ts";
import Navbar from "./components/Navbar/Navbar.tsx";
import {REPORTING} from "./data/data.ts";
import {ReportingLevel} from "./types/types.ts";
import {useState} from "react";
import * as React from "react";

// const data: InputData = sampleData
const defaultIterations: number = 10000
const defaultConvergenceThreshold: number = 0.001
const defaultReporting: ReportingLevel = REPORTING.basic

function App() {
  // const [trainingData, setTrainingData] = useState<TrainingData>(sampleData)
  const [numOfIterations, setNumOfIterations] = useState<number>(defaultIterations)
  const [convergenceThreshold, setConvergenceThreshold] = useState<number>(defaultConvergenceThreshold)
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
  
  // train(numOfIterations, convergenceThreshold, reporting)
  return (
    <div className="App">
      <Navbar
        iterations={numOfIterations}
        setIterations={handleIterationsChange}
        threshold={convergenceThreshold}
        setThreshold={handleThresholdChange}
        reporting={reporting}
        setReportLevel={handleReportingChange}
      />
    
    </div>
  )
}

export default App