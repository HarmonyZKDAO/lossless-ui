import { Amount } from '@losslessproject/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { EstimateAction } from '@constants/odds'
import { InfoListItem } from '.'
import { useUsersAddress } from '@losslessproject/wallet-connection'
import { useUsersPrizePoolOdds } from '@hooks/v4/PrizePool/useUsersPrizePoolOdds'
import { PrizePool } from '@losslessproject/client-js'

export const UpdatedPrizePoolOddsListItem: React.FC<{
  prizePool: PrizePool
  amount: Amount
  action: EstimateAction
}> = (props) => {
  const { amount, action, prizePool } = props
  const { t } = useTranslation()

  const usersAddress = useUsersAddress()
  const { data: oddsData } = useUsersPrizePoolOdds(
    usersAddress,
    prizePool,
    action,
    amount?.amountUnformatted
  )

  const isFetched = !!oddsData

  let value
  if (isFetched) {
    if (oddsData?.odds === 0) {
      value = <span className='opacity-80'>{t('none')}</span>
    } else {
      value = t('oneInOdds', { odds: oddsData.oneOverOdds.toFixed(2) })
    }
  }

  return (
    <InfoListItem
      label={'Prize Pool winning odds'}
      labelToolTip={'Your estimated odds of winning at least one prize in this prize pool'}
      loading={!isFetched}
      value={value}
    />
  )
}
