import React from 'react'
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { InputData, TrainingData } from '../../types/types.ts'
import helpers from '../../util/helpers.ts'

const arbitraryAxisExtension = 1.1
const colors = ['#dd7f03', '#203e9f', '#7b1d9f', '#158b1f', '#dd1435']

type Props = {
  inputData: InputData
  trainingData: TrainingData
  weight: number
  bias: number
}

export const Graph: React.FC<Props> = ({
  inputData,
  trainingData,
  weight,
  bias,
}) => {
  const data = inputData.data
  // Extract feature and label values
  const features = data.map(d => d.feature)
  const labels = data.map(d => d.label)

  // X-axis and Y-axis increments

  console.log('****()** inc 24:', helpers.findGraphIncrement(24))
  console.log('****()** inc 25:', helpers.findGraphIncrement(25))
  console.log('****()** inc 327:', helpers.findGraphIncrement(327))

  // Calculate max values for x and y
  const maxFeature = Math.max(...features) * arbitraryAxisExtension
  console.log('****()** maxFeature:', maxFeature)
  const maxLabel = Math.max(...labels) * arbitraryAxisExtension
  console.log('****()** maxLabel:', maxLabel)

  console.log('****()** inc X:', helpers.findGraphIncrement(maxFeature))
  console.log('****()** inc Y:', helpers.findGraphIncrement(maxLabel))

  const xAxisIncrement = helpers.findGraphIncrement(maxFeature * 1.3)
  const yAxisIncrement = helpers.findGraphIncrement(maxLabel * 1.3)

  // Calculate the rounded limits for axes
  const roundedMaxX = Math.ceil(maxFeature) + xAxisIncrement
  const roundedMaxY = Math.ceil(maxLabel / yAxisIncrement) * yAxisIncrement
  console.log('****()** roundedMaxX:', roundedMaxX)
  console.log('****()** roundedMaxY:', roundedMaxY)

  // Find selected iterations
  const selectedIterations = trainingData.filter(
    iteration => iteration.selected
  )
  console.log('****()** selectedIterations:', selectedIterations)

  const regressionLines = []
  for (const iteration of selectedIterations) {
    const regressionLine = [
      { feature: 0, label: 0 + iteration.bias },
      {
        feature: roundedMaxX,
        label: iteration.weight * roundedMaxX + iteration.bias,
      },
      { iteration: iteration.iteration },
    ]
    regressionLines.push(regressionLine)
  }

  // Calculate regression line based on the range of the graph
  const minFeature = 0
  const maxFeatureForLine = roundedMaxX
  const regressionLine = [
    { feature: minFeature, label: weight * minFeature + bias },
    { feature: maxFeatureForLine, label: weight * maxFeatureForLine + bias },
  ]
  console.log('****()** regressionLine:', regressionLine)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid />

        {/* X Axis with fixed increments */}
        <XAxis
          type="number"
          dataKey="feature"
          name="Feature"
          domain={[0, roundedMaxX]}
          label={{
            value: inputData.featureLabel,
            position: 'insideBottom',
            offset: -5,
            style: { fontWeight: 'bold', fill: '#333' },
          }}
          ticks={Array.from(
            { length: roundedMaxX + 1 },
            (_, i) => i * xAxisIncrement
          )}
        />

        {/* Y Axis with fixed increments */}
        <YAxis
          type="number"
          dataKey="label"
          name="Label"
          domain={[0, roundedMaxY]}
          label={{
            value: inputData.labelLabel,
            angle: -90,
            position: 'insideLeft',
            offset: 10,
          }}
          ticks={Array.from(
            { length: roundedMaxY / yAxisIncrement + 1 },
            (_, i) => i * yAxisIncrement
          )}
        />

        <Tooltip />
        <Legend verticalAlign="top" align="center" />

        {/* Data points */}
        <Scatter
          name="Data points"
          data={data}
          fill="#8884d8"
          legendType="none"
        />

        {/* Regression line */}
        {regressionLines.map((line, index) => (
          <Scatter
            key={index}
            name={`Iteration ${line[2].iteration}`}
            data={line}
            line
            fill={colors[index % colors.length]} // cycle through colors
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  )
}
