import { FullWalletConnectionButton } from '@losslessproject/wallet-connection'
import { Trans } from 'react-i18next'

import { getSupportedChains } from '@utils/getSupportedChains'

/**
 * NOTE: Only render one per app
 * @param props
 * @returns
 */
export const FullWalletConnectionButtonWrapper = (props) => {
  const chains = getSupportedChains()

  return (
    <FullWalletConnectionButton
      {...props}
      chains={chains}
      // TosDisclaimer={
      //   <Trans
      //     i18nKey='connectWalletTermsAndDisclaimerBlurb'
      //     components={{
      //       termsLink: (
      //         <a
      //           className='text-pt-teal transition hover:opacity-70 underline'
      //           href='https://pooltogether.com/terms/'
      //           target='_blank'
      //           rel='noreferrer'
      //         />
      //       ),
      //       disclaimerLink: (
      //         <a
      //           className='text-pt-teal transition hover:opacity-70 underline'
      //           href='https://pooltogether.com/protocol-disclaimer/'
      //           target='_blank'
      //           rel='noreferrer'
      //         />
      //       )
      //     }}
      //   />
      // }
      // TosDisclaimer="By connecting a wallet, you agree to Lossless's Terms of Service and acknowledge that you have read and understand the Lossless protocol disclaimer."
      TosDisclaimer={
        <span>
          By connecting a wallet, you agree to Lossless's{' '}
          <a className='text-blue-2 transition hover:opacity-70 underline'>Terms of Service</a> and
          acknowledge that you have read and understand the{' '}
          <a className='text-blue-2 transition hover:opacity-70 underline'>
            Lossless protocol disclaimer
          </a>
          .
        </span>
      }
    />
  )
}
