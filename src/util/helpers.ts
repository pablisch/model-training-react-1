export default {
  findGraphIncrement: (maxValue: number) => {
    const preferredSteps = [1, 2, 5]
    const minIncrements = 5
    const maxIncrements = 12

    if (maxValue <= 0) return 0

    const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)))
    for (let factor = magnitude / 10; factor <= magnitude * 10; factor *= 10) {
      for (const step of preferredSteps) {
        const increment = step * factor
        const numIncrements = Math.ceil(maxValue / increment)
        if (numIncrements >= minIncrements && numIncrements <= maxIncrements) {
          return increment
        }
      }
    }

    // fallback: just return the max divided by 10 if nothing fits
    return maxValue / 10
  },
}
