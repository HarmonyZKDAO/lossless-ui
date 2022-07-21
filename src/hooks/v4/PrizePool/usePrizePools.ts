import { useSupportedChainIds } from '@hooks/useSupportedChainIds'
import { usePrizePoolNetwork } from '@hooks/v4/PrizePoolNetwork/usePrizePoolNetwork'

/**
 * Filter here to cut off any bad acting prize pools from the single config
 * @returns
 */
export const usePrizePools = () => {
  const prizePoolNetwork = usePrizePoolNetwork()
  const supportedChainIds = useSupportedChainIds()
  return prizePoolNetwork?.prizePools.filter((prizePool) =>
    supportedChainIds.includes(prizePool.chainId)
  )
}
