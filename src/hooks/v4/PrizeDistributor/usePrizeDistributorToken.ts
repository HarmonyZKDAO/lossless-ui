import { Token } from '@losslessproject/hooks'
import { PrizeDistributor } from '@losslessproject/client-js'
import { NO_REFETCH } from '@constants/query'
import { useQuery } from 'react-query'

export const PRIZE_DISTRIBUTOR_TOKEN_QUERY_KEY = 'usePrizeDistributorToken'

export const usePrizeDistributorToken = (prizeDistributor: PrizeDistributor) => {
  return useQuery(
    [PRIZE_DISTRIBUTOR_TOKEN_QUERY_KEY, prizeDistributor?.id()],
    async () => getPrizeDistributorToken(prizeDistributor),
    { ...NO_REFETCH }
  )
}

export const getPrizeDistributorToken = async (
  prizeDistributor: PrizeDistributor
): Promise<{
  prizeDistributorId: string
  token: Token
}> => {
  const tokenData = await prizeDistributor.getTokenData()
  const tokenContract = await prizeDistributor.getTokenContract()

  const token: Token = {
    address: tokenContract.address,
    symbol: tokenData.symbol,
    name: tokenData.name,
    decimals: tokenData.decimals
  }

  return {
    prizeDistributorId: prizeDistributor.id(),
    token
  }
}
