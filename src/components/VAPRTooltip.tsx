import React from 'react'
import { Tooltip } from '@losslessproject/react-components'
import { useTranslation } from 'react-i18next'

export const VAPRTooltip = () => {
  const { t } = useTranslation()
  return (
    <span className='border-b border-dotted border-white'>
      <Tooltip
        id={`tooltip-vapr`}
        tip={t(
          'vAPRDescription',
          'Variable APR means that the Annual Percentage Rate can change over time.'
        )}
      >
        {t('vAPR', 'vAPR')}
      </Tooltip>
    </span>
  )
}
