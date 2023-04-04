import React from 'react'
import { DefaultOptions, useQueryClient } from '@tanstack/react-query'
import { createContext, useMemo } from 'react'
import { AxiosQueryProviderPropsType, ContextType } from '../types'
export const AxiosQueryContext = createContext<ContextType>({})

function AxiosQueryContextProvider({
  defaultBaseUrl,
  otherBaseUrl,
  defaultOptions,
  children,
  middleware,
}: AxiosQueryProviderPropsType) {
  const queryClient = useQueryClient()

  if (defaultOptions) {
    queryClient.setDefaultOptions({
      queries: {
        retry: 2,
        ...(defaultOptions.queries as DefaultOptions['queries']),
      },
      mutations: {
        ...(defaultOptions.mutations as DefaultOptions['mutations']),
      },
    })
  }
  const contextValueMemo = useMemo(
    () => ({
      defaultBaseUrl: defaultBaseUrl,
      otherBaseUrl,
      headers: defaultOptions?.headers,
      timeout: defaultOptions?.timeout,
      middleware,
      commonErrorDto: defaultOptions?.errorDto,
    }),
    [defaultBaseUrl, otherBaseUrl, defaultOptions, middleware],
  )

  return <AxiosQueryContext.Provider value={contextValueMemo}>{children}</AxiosQueryContext.Provider>
}

export default AxiosQueryContextProvider
