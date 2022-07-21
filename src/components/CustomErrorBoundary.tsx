import React from 'react'
import * as Sentry from '@sentry/react'

import { ErrorPage } from '@views/ErrorPage'
import { useConnect } from 'wagmi'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />
    }

    return this.props.children
  }
}

export function CustomErrorBoundary(props) {
  const { children } = props
  const { activeConnector } = useConnect()

  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return <ErrorBoundary>{children}</ErrorBoundary>
  } else {
    return (
      <>
        <Sentry.ErrorBoundary
          onError={(error) => {
            const chunkFailedMessage = /Loading chunk [\d]+ failed/
            if (chunkFailedMessage.test(error.message)) {
              window.location.reload()
            }
          }}
          beforeCapture={(scope) => {
            if (activeConnector?.name) {
              scope.setTag('web3', activeConnector.name)
              scope.setContext('wallet', {
                name: activeConnector.name
              })
            }
          }}
          fallback={({ error, componentStack, resetError }) => <ErrorPage />}
        >
          {children}
        </Sentry.ErrorBoundary>
      </>
    )
  }
}
