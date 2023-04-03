import React from 'react'
import { DefaultOptions, useQueryClient } from '@tanstack/react-query'
import { createContext, useMemo } from 'react'
import { RHookProviderPropsType, ContextType } from '../types/types'
export const RestHookContext = createContext<ContextType>({})

function RestHookContextProvider({
  defaultBaseUrl,
  otherBaseUrl,
  defaultOptions,
  children,
  middleware,
}: RHookProviderPropsType) {
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

  return <RestHookContext.Provider value={contextValueMemo}>{children}</RestHookContext.Provider>
}

export default RestHookContextProvider
