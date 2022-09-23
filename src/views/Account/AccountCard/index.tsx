import React, { useMemo } from 'react'
import FeatherIcon from 'feather-icons-react'
import { ThemedClipSpinner, CountUp } from '@losslessproject/react-components'
import { useTranslation } from 'react-i18next'
import { Amount } from '@losslessproject/hooks'
import classNames from 'classnames'

import { useUsersPrizePoolNetworkOdds } from '@hooks/v4/PrizePoolNetwork/useUsersPrizePoolNetworkOdds'
import { useUsersAddress } from '@losslessproject/wallet-connection'
import { TotalWinnings } from './TotalWinnings'
import { useUsersTotalBalances } from '@hooks/useUsersTotalBalances'
import WalletIllustration from '@assets/images/wallet-illustration.png'
import { unionProbabilities } from '@utils/unionProbabilities'

interface AccountCardProps {
  className?: string
}

export const AccountCard = (props: AccountCardProps) => {
  return (
    <div
      className={classNames(
        'flex flex-col p-4 card-gradient rounded-lg space-y-2',
        props.className
      )}
    >
      <div className='flex justify-between p-4'>
        <TotalBalance />
        {/* <img src={WalletIllustration} style={{ width: '65px', height: '60px' }} /> */}
      </div>
      <div className='flex space-x-2'>
        <DailyOdds />
        <WeeklyOdds />
      </div>
      <TotalWinnings />
    </div>
  )
}

const TotalBalance = (props: { className?: string }) => {
  const { className } = props
  const { t } = useTranslation()
  const { data: balancesData } = useUsersTotalBalances()
  return (
    <a href='#deposits' className={className}>
      <span className='font-semibold uppercase text-xs'>{t('totalBalance', 'Total balance')}</span>
      <span className='leading-none flex text-2xl xs:text-4xl font-bold relative'>
        <TotalBalanceAmount
          isFetched={balancesData.isFullyFetched}
          totalBalanceUsd={balancesData.data.totalBalanceUsd}
          totalV4Balance={balancesData.data.totalV4Balance}
        />
        {balancesData.isStillFetching ? (
          <ThemedClipSpinner sizeClassName='w-4 h-4' className='ml-2 my-auto' />
        ) : (
          <FeatherIcon icon='chevron-right' className='w-6 h-6 opacity-50 my-auto ml-1' />
        )}
      </span>
    </a>
  )
}

const TotalBalanceAmount = (props: {
  totalBalanceUsd: Amount
  totalV4Balance: number
  isFetched: boolean
}) => {
  const { totalBalanceUsd, totalV4Balance, isFetched } = props
  // If not fetched
  // If no token price or balance
  // If token price
  if (
    !isFetched ||
    !totalBalanceUsd.amountUnformatted.isZero() ||
    (totalBalanceUsd.amountUnformatted.isZero() && !totalV4Balance)
  ) {
    return (
      <>
        $<CountUp countTo={Number(totalBalanceUsd.amount)} />
      </>
    )
  }

  return <CountUp countTo={Number(totalV4Balance)} />
}

const DailyOdds = () => <OddsBox i18nKey='dailyOdds' daysOfPrizes={1} />
const WeeklyOdds = () => <OddsBox i18nKey='weeklyOdds' daysOfPrizes={7} />

const OddsBox = (props: { i18nKey: string; daysOfPrizes: number }) => {
  const { i18nKey, daysOfPrizes } = props
  const usersAddress = useUsersAddress()
  const { data, isFetched, isFetching, isError } = useUsersPrizePoolNetworkOdds(usersAddress)
  const { t } = useTranslation()

  const oneOverOddstring = useMemo(() => {
    if (!isFetched) return null
    const totalOdds = unionProbabilities(...Array(daysOfPrizes).fill(data.odds))
    const oneOverOdds = 1 / totalOdds
    return Number(oneOverOdds.toFixed(2)) < 1.01 ? 1 : oneOverOdds.toFixed(2)
  }, [isFetched, isFetching])

  if (!isFetched || data?.odds === undefined) {
    return (
      <div className='bg-white bg-opacity-20 dark:bg-actually-black dark:bg-opacity-10 rounded-lg w-full p-4 flex flex-col leading-none text-center'>
        <ThemedClipSpinner sizeClassName='w-5 h-5' className='mx-auto' />
      </div>
    )
  }

  if (!data || isError) return <p>Error</p>

  if (data.odds === 0) {
    return (
      <div className='bg-white bg-opacity-20 dark:bg-actually-black dark:bg-opacity-10 rounded-lg w-full p-4 flex flex-col leading-none text-center'>
        <span className='font-bold flex text-lg mx-auto'>
          {daysOfPrizes === 1 ? '0 😔' : t('stillZero', 'Still 0')}
        </span>
        <span className='mt-1 opacity-50 font-bold uppercase'>{t(i18nKey)}*</span>
      </div>
    )
  }

  return (
    <div className='bg-white bg-opacity-20 dark:bg-actually-black dark:bg-opacity-10 rounded-lg w-full p-4 flex flex-col leading-none text-center'>
      <span className='font-bold flex text-lg mx-auto'>1:{oneOverOddstring}</span>
      <span className='mt-1 opacity-50 font-bold uppercase'>{t(i18nKey)}*</span>
    </div>
  )
}
