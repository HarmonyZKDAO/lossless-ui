import { calculate, PrizeTier } from '@losslessproject/client-js'

export const calculateTotalNumberOfPrizes = (prizeTier: PrizeTier): number => {
  return prizeTier.tiers.reduce((totalNumberPrizes: number, currentTier: number, index: number) => {
    if (currentTier === 0) return totalNumberPrizes
    return (
      totalNumberPrizes +
      calculate.calculateNumberOfPrizesForTierIndex(prizeTier.bitRangeSize, index)
    )
  }, 0)
}
