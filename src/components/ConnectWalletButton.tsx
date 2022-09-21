import React from 'react'
import { useTranslation } from 'react-i18next'
import { SquareButton } from '@losslessproject/react-components'
import { useConnectWallet } from '@losslessproject/wallet-connection'
import classNames from 'classnames'

interface ConnectWalletButtonProps {
  className?: string
}

export const ConnectWalletButton = (props: ConnectWalletButtonProps) => {
  const { className } = props
  const connectWallet = useConnectWallet()
  const { t } = useTranslation()
  return (
    <SquareButton
      className={classNames('walletBtn', className)}
      onClick={() => connectWallet()}
      type='button'
    >
      {t('Connect Wallet')}
    </SquareButton>
  )
}

ConnectWalletButton.defaultProps = {
  className: 'w-full'
}
