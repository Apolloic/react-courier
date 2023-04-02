import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import AxiosQueryContextProvider from './RestHookContextProvider'
import { RHookProviderPropsType } from '../types/types'
import React from 'react'
const queryClient = new QueryClient()

export function RestHookProvider(props: RHookProviderPropsType) {
  return (
    <QueryClientProvider client={queryClient}>
      <AxiosQueryContextProvider
        otherBaseUrl={props.otherBaseUrl}
        defaultOptions={props.defaultOptions}
        defaultBaseUrl={props.defaultBaseUrl}
      >
        {props.children}
      </AxiosQueryContextProvider>
    </QueryClientProvider>
  )
}
