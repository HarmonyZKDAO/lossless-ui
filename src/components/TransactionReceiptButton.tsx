import {
  formatBlockExplorerTxUrl,
  SquareLink,
  SquareButtonTheme,
  SquareButtonSize
} from '@losslessproject/react-components'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { Transaction } from '@losslessproject/wallet-connection'

interface TransactionReceiptButtonProps {
  className?: string
  chainId: number
  tx: Transaction
}

export const TransactionReceiptButton = (props: TransactionReceiptButtonProps) => {
  const { chainId, tx, className } = props
  const { t } = useTranslation()

  const url = formatBlockExplorerTxUrl(tx?.response?.hash, chainId)

  return (
    <SquareLink
      target='_blank'
      href={url}
      theme={SquareButtonTheme.tealOutline}
      size={SquareButtonSize.md}
      className={className}
    >
      {t('viewReceipt', 'View receipt')}
    </SquareLink>
  )
}

TransactionReceiptButton.defaultProps = {
  hideCloseButton: false
}
