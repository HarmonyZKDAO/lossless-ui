import { ContractList } from '@losslessproject/client-js'
import { testnet, mainnet } from '@losslessproject/pool-data'
import { useIsTestnets } from '@losslessproject/hooks'

export const useContractList = (): ContractList => {
  const { isTestnets } = useIsTestnets()
  return isTestnets ? (testnet as ContractList) : (mainnet as ContractList)
}
