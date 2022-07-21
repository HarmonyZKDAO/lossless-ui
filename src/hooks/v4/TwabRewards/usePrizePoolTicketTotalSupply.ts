import { useRefetchInterval } from '@losslessproject/hooks'
import { PrizePool } from '@losslessproject/client-js'
import { useQuery } from 'react-query'

export const PRIZE_POOL_TICKET_TOTAL_SUPPLY_QUERY_KEY = 'usePrizePoolTicketTotalSupply'

export const usePrizePoolTicketTotalSupply = (prizePool: PrizePool) => {
  const refetchInterval = useRefetchInterval(prizePool?.chainId)
  const enabled = Boolean(prizePool)
  return useQuery(
    [PRIZE_POOL_TICKET_TOTAL_SUPPLY_QUERY_KEY, prizePool?.id()],
    () => prizePool?.getTicketTotalSupply(),
    {
      enabled,
      refetchInterval
    }
  )
}
