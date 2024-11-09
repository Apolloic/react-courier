import React from 'react'
import { DefaultOptions, useQueryClient } from '@tanstack/react-query'
import { createContext, useMemo } from 'react'
import { CourierProviderPropsType, ContextType } from '../types'
export const CourierContext = createContext<ContextType>({})

function CourierContextProvider({
  defaultBaseUrl,
  otherBaseUrl,
  defaultOptions,
  children,
  middleware,
  dehydratedState,
}: CourierProviderPropsType) {
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
      axiosAgentConfig: defaultOptions?.axiosAgentConfig,
      headers: defaultOptions?.headers,
      timeout: defaultOptions?.timeout,
      middleware,
      commonErrorDto: defaultOptions?.errorDto,
      dehydratedState,
    }),
    [defaultBaseUrl, otherBaseUrl, defaultOptions, middleware],
  )

  return <CourierContext.Provider value={contextValueMemo}>{children}</CourierContext.Provider>
}

export default CourierContextProvider
