import { Token, TokenWithUsdBalance } from '@losslessproject/hooks'
import { PrizePool } from '@losslessproject/client-js'
import { toScaledUsdBigNumber } from '@losslessproject/utilities'
import { BigNumber } from 'ethers'
import { useQuery } from 'react-query'
import { PrizePoolTokens, usePrizePoolTokens } from '@hooks/v4/PrizePool/usePrizePoolTokens'
import { getAmountFromBigNumber } from '@utils/getAmountFromBigNumber'
import { NO_REFETCH } from '@constants/query'

export interface UsersPrizePoolBalances {
  ticket: TokenWithUsdBalance
  token: TokenWithUsdBalance
}

export const USERS_PRIZE_POOL_BALANCES_QUERY_KEY = 'useUsersPrizePoolBalances'

export const useUsersPrizePoolBalances = (usersAddress: string, prizePool: PrizePool) => {
  const { data: tokens, isFetched } = usePrizePoolTokens(prizePool)

  const enabled = Boolean(prizePool) && Boolean(usersAddress) && isFetched

  return useQuery(
    [USERS_PRIZE_POOL_BALANCES_QUERY_KEY, prizePool.id(), usersAddress],
    async () => getUsersPrizePoolBalances(prizePool, usersAddress, tokens),
    {
      ...NO_REFETCH,
      enabled
    }
  )
}

export const getUsersPrizePoolBalances = async (
  prizePool: PrizePool,
  usersAddress: string,
  tokens: PrizePoolTokens
): Promise<{
  prizePool: PrizePool
  usersAddress: string
  balances: UsersPrizePoolBalances
}> => {
  const balances = await prizePool.getUsersPrizePoolBalances(usersAddress)
  const { ticket, token } = tokens

  return {
    prizePool,
    usersAddress,
    balances: {
      ticket: makeTokenWithUsdBalance(ticket, balances.ticket),
      token: makeTokenWithUsdBalance(token, balances.token)
    }
  }
}

/**
 * NOTE: Assumes token is a stablecoin.
 * @param token
 * @param balances
 */
const makeTokenWithUsdBalance = (token: Token, balanceUnformatted: BigNumber) => {
  const balance = getAmountFromBigNumber(balanceUnformatted, token.decimals)
  const balanceUsdScaled = toScaledUsdBigNumber(balance.amount)
  return {
    ...token,
    ...balance,
    hasBalance: !balanceUnformatted.isZero(),
    balanceUsd: balance,
    usdPerToken: 1,
    balanceUsdScaled
  }
}
