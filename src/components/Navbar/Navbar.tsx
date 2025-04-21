import './Navbar.css'
import * as React from 'react'
import { ReportingLevel } from '../../types/types.ts'

interface NavbarProps {
  iterations: number
  setIterations: (e: React.ChangeEvent<HTMLInputElement>) => void
  threshold: number
  setThreshold: (e: React.ChangeEvent<HTMLInputElement>) => void
  reporting: ReportingLevel
  setReportLevel: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onTrain: () => void
}

const Navbar = ({
  iterations,
  setIterations,
  threshold,
  setThreshold,
  reporting,
  setReportLevel,
  onTrain,
}: NavbarProps) => {
  return (
    <nav>
      <div className="nav-container">
        <h1>Model training Mk1</h1>
        <div className="nav-btn-container">
          <label className="nav-label">
            Iterations:
            <input
              className="nav-input"
              type="number"
              value={iterations}
              onChange={setIterations}
              placeholder="Iterations"
            />
          </label>
          <label className="nav-label">
            Threshold:
            <input
              className="nav-input"
              type="number"
              value={threshold}
              onChange={setThreshold}
              placeholder="Iterations"
            />
          </label>
          <label className="nav-label">
            Reporting
            <select
              className="nav-input"
              value={reporting}
              onChange={setReportLevel}
            >
              <option value="basic">Basic</option>
              <option value="verbose">Verbose</option>
              <option value="full">Full</option>
            </select>
          </label>
          <button className="nav-btn" onClick={onTrain}>
            Train
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
