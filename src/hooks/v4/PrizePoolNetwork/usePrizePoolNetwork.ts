import { useReadProviders } from '@hooks/useReadProviders'
import { getContractListChainIds, PrizePoolNetwork } from '@losslessproject/client-js'

import { useContractList } from '../useContractList'

export const usePrizePoolNetwork = (): PrizePoolNetwork => {
  const prizePoolNetworkContractList = useContractList()
  const chainIds = getContractListChainIds(prizePoolNetworkContractList.contracts)
  const readProviders = useReadProviders(chainIds)
  return new PrizePoolNetwork(readProviders, prizePoolNetworkContractList)
}
