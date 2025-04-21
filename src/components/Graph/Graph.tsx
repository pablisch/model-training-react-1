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

type DataPoint = { feature: number; label: number }

type Props = {
  data: DataPoint[]
  weight: number
  bias: number
}

export const Graph: React.FC<Props> = ({ data, weight, bias }) => {
  // Extract feature and label values
  const features = data.map(d => d.feature)
  const labels = data.map(d => d.label)

  // X-axis and Y-axis increments
  const xAxisIncrement = 1
  const yAxisIncrement = 5

  // Calculate max values for x and y
  const maxFeature = Math.max(...features)
  const maxLabel = Math.max(...labels)

  // Calculate the rounded limits for axes
  const roundedMaxX = Math.ceil(maxFeature) + xAxisIncrement
  const roundedMaxY = Math.ceil(maxLabel / yAxisIncrement) * yAxisIncrement

  // Calculate regression line based on the range of the graph
  const minFeature = 0
  const maxFeatureForLine = roundedMaxX
  const regressionLine = [
    { feature: minFeature, label: weight * minFeature + bias },
    { feature: maxFeatureForLine, label: weight * maxFeatureForLine + bias },
  ]

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
          ticks={Array.from(
            { length: roundedMaxX + 1 },
            (_, i) => i * xAxisIncrement
          )} // Fixed increments for X axis
        />

        {/* Y Axis with fixed increments */}
        <YAxis
          type="number"
          dataKey="label"
          name="Label"
          domain={[0, roundedMaxY]}
          ticks={Array.from(
            { length: roundedMaxY / yAxisIncrement + 1 },
            (_, i) => i * yAxisIncrement
          )} // Fixed increments for Y axis
        />

        <Tooltip />
        <Legend />

        {/* Data points */}
        <Scatter name="Data" data={data} fill="#8884d8" />

        {/* Regression line */}
        <Scatter
          name="Regression Line"
          data={regressionLine}
          line
          fill="#ff7300"
        />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
