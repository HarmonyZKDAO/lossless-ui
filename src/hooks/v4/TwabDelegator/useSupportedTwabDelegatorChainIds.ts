import { useAppEnvString } from '@hooks/useAppEnvString'
import { SUPPORTED_CHAIN_IDS } from '@losslessproject/twab-delegator-js'

export const useSupportedTwabDelegatorChainIds = () => {
  const appEnv = useAppEnvString()
  return SUPPORTED_CHAIN_IDS[appEnv]
}
