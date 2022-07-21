import { RPC_API_KEYS } from '@constants/config'
import { useReadProviders as _useReadProviders } from '@losslessproject/wallet-connection'

/**
 * Wrapper on useReadProviders from @losslessproject/wallet-connection that injects RPC API keys
 * @param chainId
 * @returns
 */
export const useReadProviders = (chainIds: number[]) => {
  return _useReadProviders(chainIds, RPC_API_KEYS)
}
