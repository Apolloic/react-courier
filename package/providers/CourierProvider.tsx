import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import CourierContextProvider from './CourierContextProvider'
import { CourierProviderPropsType } from '../types'
import React from 'react'
const queryClient = new QueryClient()

export function CourierProvider(props: CourierProviderPropsType) {
  return (
    <QueryClientProvider client={queryClient}>
      <CourierContextProvider
        otherBaseUrl={props.otherBaseUrl}
        defaultOptions={props.defaultOptions}
        defaultBaseUrl={props.defaultBaseUrl}
        middleware={props.middleware}
      >
        {props.children}
      </CourierContextProvider>
    </QueryClientProvider>
  )
}
