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

  // Calculate max values for x and y with some arbitrary extension padding
  const maxXValue = Math.max(...features) * arbitraryAxisExtension
  const minXValue = Math.min(...features) * arbitraryAxisExtension
  console.log('****()** Math.min(...features):', Math.min(...features))
  const maxYValue = Math.max(...labels) * arbitraryAxisExtension
  const minYValue = Math.min(...labels) * arbitraryAxisExtension

  const xAxisIncrement = helpers.findGraphIncrement(maxXValue - minXValue)
  const yAxisIncrement = helpers.findGraphIncrement(maxYValue - minYValue)

  // Calculate limits for axes ending in ticks
  const maxGraphX = Math.max(
    Math.ceil(maxXValue / xAxisIncrement) * xAxisIncrement,
    0
  )
  const minGraphX = Math.min(
    Math.floor(minXValue / xAxisIncrement) * xAxisIncrement,
    0
  )
  const maxGraphY = Math.max(
    Math.ceil(maxYValue / yAxisIncrement) * yAxisIncrement,
    0
  )
  const minGraphY = Math.min(
    Math.floor(minYValue / yAxisIncrement) * yAxisIncrement,
    0
  )
  console.log('****()** maxGraphX:', maxGraphX, 'minGraphX:', minGraphX)
  console.log('****()** maxGraphY:', maxGraphY, 'minGraphY:', minGraphY)

  const roundedMaxY = Math.ceil(maxYValue / yAxisIncrement) * yAxisIncrement
  console.log('****()** maxGraphX:', maxGraphX)
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
        feature: maxGraphX,
        label: iteration.weight * maxGraphX + iteration.bias,
      },
      { iteration: iteration.iteration },
    ]
    regressionLines.push(regressionLine)
  }

  // TODO calculate graph start and end lines using the slope formula and validated against the graph extents

  // Calculate regression line based on the range of the graph
  const minFeature = 0
  const maxFeatureForLine = maxGraphX
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
          domain={[minGraphX, maxGraphX]}
          label={{
            value: inputData.featureLabel,
            position: 'insideBottom',
            offset: -5,
            style: { fontWeight: 'bold', fill: '#333' },
          }}
          ticks={Array.from(
            { length: (maxGraphX - minGraphX) / xAxisIncrement + 1 },
            (_, i) => minGraphX + i * xAxisIncrement
          )}
        />

        {/* Y Axis with fixed increments */}
        <YAxis
          type="number"
          dataKey="label"
          name="Label"
          domain={[minGraphY, maxGraphY]}
          label={{
            value: inputData.labelLabel,
            angle: -90,
            position: 'insideLeft',
            offset: 10,
          }}
          ticks={Array.from(
            { length: (maxGraphY - minGraphY) / yAxisIncrement + 1 },
            (_, i) => minGraphY + i * yAxisIncrement
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
