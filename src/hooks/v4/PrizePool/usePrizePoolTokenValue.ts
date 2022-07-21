import { PrizePool } from '@losslessproject/client-js'
import { TokenPrice, useCoingeckoTokenPrices } from '@losslessproject/hooks'
import { UseQueryResult } from 'react-query'
import { usePrizePoolTokens } from './usePrizePoolTokens'

export const usePrizePoolTokenValue = (
  prizePool: PrizePool
): UseQueryResult<TokenPrice, unknown> => {
  const { data: tokens } = usePrizePoolTokens(prizePool)
  const chainId = prizePool?.chainId
  const response = useCoingeckoTokenPrices(chainId, [tokens?.token.address])
  return { ...response, data: response.data?.[tokens?.token.address] } as UseQueryResult<
    TokenPrice,
    unknown
  >
}
