import React from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { LoadingLogo } from '@losslessproject/react-components'

import { PageHeader } from '@components/Layout/PageHeader'
import { useInitialLoad } from '@hooks/useInitialLoad'
import { BottomNavigation } from './Navigation'
import { AlertBanners } from '@components/AlertBanners'
import { RewardsBanners } from '@components/RewardsBanners'

interface LayoutProps {
  className?: string
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  const { children, className } = props

  const isInitialized = useInitialLoad()
  const { i18n } = useTranslation()

  const isReady = isInitialized && i18n.isInitialized

  return (
    <div className={classNames(className, 'min-h-screen')}>
      {isReady ? (
        <>
          <AlertBanners />
          <RewardsBanners />
          <PageHeader />
          {children}
          <BottomNavigation />
        </>
      ) : (
        <div className='flex flex-col h-screen absolute top-0 w-screen'>
          <LoadingLogo className='m-auto' />
        </div>
      )}
    </div>
  )
}

export default Layout
