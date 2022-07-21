import { Token } from '@losslessproject/hooks'

import { useUpcomingPrizeTier } from '@hooks/v4/PrizePool/useUpcomingPrizeTier'
import { getAmountFromString } from '@utils/getAmountFromString'
import { PrizePool } from '@losslessproject/client-js'

/**
 * Brendan promised that the bit range size would be consistent.
 * Eventually we will want to read this from the chain.
 * @param prizePool
 * @param token
 * @returns
 */
export const useMinimumDepositAmount = (prizePool: PrizePool, token: Token) => {
  const { data: prizeTierData, isFetched } = useUpcomingPrizeTier(prizePool)
  if (!Boolean(token) || !isFetched || prizeTierData.prizePoolId !== prizePool.id()) return null
  return getAmountFromString(
    Math.pow(2, prizeTierData.prizeTier.bitRangeSize).toString(),
    token.decimals
  )
}
