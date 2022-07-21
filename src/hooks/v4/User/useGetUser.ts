import { User, PrizePool } from '@losslessproject/client-js'
import { useSigner } from 'wagmi'

/**
 * Returns a User built with a Signer from the users wallet
 * @param prizePool
 * @returns
 */
export const useGetUser = (prizePool: PrizePool) => {
  const { refetch: getSigner } = useSigner()
  return async () => {
    const { data: signer } = await getSigner()
    return new User(prizePool.prizePoolMetadata, signer, prizePool)
  }
}
