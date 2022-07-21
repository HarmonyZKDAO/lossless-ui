import { DrawResults, PrizeDistributor } from '@losslessproject/client-js'
import { useAtom } from 'jotai'

import { drawResultsAtom } from '@utils/drawResultsStorage'

export const useUsersStoredDrawResults = (
  usersAddress: string,
  prizeDistributor: PrizeDistributor
): {
  [usersAddress: string]: {
    [drawId: number]: DrawResults
  }
} => {
  const [drawResults] = useAtom(drawResultsAtom)
  const usersDrawResults = drawResults?.[usersAddress]?.[prizeDistributor.id()] || {}
  return { [usersAddress]: usersDrawResults }
}
