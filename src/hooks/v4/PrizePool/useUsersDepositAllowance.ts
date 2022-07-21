import { User, PrizePool } from '@losslessproject/client-js'
import { BigNumber } from 'ethers'
import { NO_REFETCH } from '@constants/query'
import { useUsersAddress } from '@losslessproject/wallet-connection'
import { useQuery, UseQueryOptions } from 'react-query'

export const useUsersDepositAllowance = (prizePool: PrizePool) => {
  const usersAddress = useUsersAddress()
  const enabled = Boolean(prizePool) && Boolean(usersAddress)
  return useQuery(
    ['useUsersDepositAllowance', prizePool?.id(), usersAddress],
    async () => {
      const depositAllowance = await prizePool.getUsersDepositAllowance(usersAddress)
      return depositAllowance.allowanceUnformatted
    },
    { ...NO_REFETCH, enabled } as UseQueryOptions<BigNumber>
  )
}
