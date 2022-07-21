import { V4_CHAIN_IDS } from '@constants/config'
import { APP_ENVIRONMENTS, getStoredIsTestnetsCookie } from '@losslessproject/hooks'

export const getSupportedChainIds = () => {
  const isTestnets = getStoredIsTestnetsCookie()
  return isTestnets
    ? V4_CHAIN_IDS[APP_ENVIRONMENTS.testnets]
    : V4_CHAIN_IDS[APP_ENVIRONMENTS.mainnets]
}
