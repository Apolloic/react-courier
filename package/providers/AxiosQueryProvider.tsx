import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import AxiosQueryContextProvider from './AxiosQueryContextProvider'
import { AxiosQueryProviderPropsType } from '../types'
import React from 'react'
const queryClient = new QueryClient()

export function AxiosQueryProvider(props: AxiosQueryProviderPropsType) {
  return (
    <QueryClientProvider client={queryClient}>
      <AxiosQueryContextProvider
        otherBaseUrl={props.otherBaseUrl}
        defaultOptions={props.defaultOptions}
        defaultBaseUrl={props.defaultBaseUrl}
        middleware={props.middleware}
      >
        {props.children}
      </AxiosQueryContextProvider>
    </QueryClientProvider>
  )
}
