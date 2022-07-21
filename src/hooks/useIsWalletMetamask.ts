import { useIsWalletMetamask as _useIsWalletMetamask } from '@losslessproject/hooks'
import { useConnect } from 'wagmi'

export const useIsWalletMetamask = () => {
  const { activeConnector } = useConnect()
  return !!(activeConnector?.name === 'MetaMask')
}
