import {REPORTING, sampleData} from "../data/data"

interface TrainingData {
  examples: { feature: number; label: number; loss: number | null }[];
  weight: number;
  bias: number;
  currentMse: number | null;
  previousMse: number | null;
}

const data: TrainingData = sampleData

const defaultIterations = 10000
const defaultConvergenceThreshold = 0.001
const defaultReporting = REPORTING.basic

const train = (numOfIterations = defaultIterations, convergenceThreshold = defaultConvergenceThreshold, reporting = defaultReporting) => {
    console.log("starting training", numOfIterations, convergenceThreshold, reporting, "...")
    for (let i = 0; i < numOfIterations; i++) {
        data.previousMse = data.currentMse
        console.log("iteration:", i)

        for (let j = 0; j < data.examples.length; j++) {
            const example = data.examples[j]
            const prediction = (data.weight * example.feature) + data.bias
            example.loss = prediction - example.label
        }
        const loss2 = data.examples.reduce((acc, example) => acc + Math.pow(example.loss ?? 0, 2), 0)

        const mse = loss2 / data.examples.length
        data.currentMse = mse
        const lossReduction = data.previousMse !== null && data.previousMse !== undefined 
            ? Math.abs(data.currentMse - data.previousMse) 
            : data.currentMse;
            
        const weightDerivatives = data.examples.reduce((acc, example) => acc + (example.loss ?? 0) * example.feature * 2, 0)
        const meanWeightDerivative = weightDerivatives / data.examples.length
        data.weight -= meanWeightDerivative * 0.01

        const biasDerivatives = data.examples.reduce((acc, example) => acc + (example.loss ?? 0) * 2, 0)
        const meanBiasDerivative = biasDerivatives / data.examples.length
        data.bias -= meanBiasDerivative * 0.01

        const mseReductionDisplay = data.previousMse !== null 
            ? Math.abs(data.currentMse - data.previousMse).toFixed(4) 
            : "N/A";

        if (reporting === "full") {
            console.log(`weight: ${data.weight.toFixed(2)}, bias: ${data.bias.toFixed(2)}, previous MSE: ${data.previousMse ? data.previousMse.toFixed(2) : ""}`)
            console.log(`loss2: ${loss2.toFixed(2)}, mse: ${mse.toFixed(2)}, MSE reduction: ${mseReductionDisplay}`)
            console.log("---------------------------------------")
        } else if (reporting === "verbose") {
            console.log(`weight: ${data.weight.toFixed(2)}, bias: ${data.bias.toFixed(2)}`)
            console.log(`loss2: ${loss2.toFixed(2)}, mse: ${mse.toFixed(2)}, MSE reduction: ${mseReductionDisplay}`)
            console.log("---------------------------------------")
        } else {
            console.log(`loss2: ${loss2.toFixed(2)}, mse: ${mse.toFixed(2)}, MSE reduction: ${mseReductionDisplay}`)
        }
        if (lossReduction < convergenceThreshold) {
            if (reporting === "full") console.log("Final data:", JSON.stringify(data, null, 2))
            console.log(`Loss converged. Final MSE reduction: ${lossReduction.toFixed(8)} after ${i} iteration${i !== 1 ? "s" : ""}.`)
            break
        }
    }
}

export { train }