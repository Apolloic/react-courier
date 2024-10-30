import { QueryClientProvider, QueryClient, Hydrate } from '@tanstack/react-query'
import CourierContextProvider from './CourierContextProvider'
import { CourierProviderPropsType } from '../types'
import React from 'react'

export function CourierProvider(props: CourierProviderPropsType) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={props.dehydratedState}>
        <CourierContextProvider
          otherBaseUrl={props.otherBaseUrl}
          defaultOptions={props.defaultOptions}
          defaultBaseUrl={props.defaultBaseUrl}
          middleware={props.middleware}
        >
          {props.children}
        </CourierContextProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
