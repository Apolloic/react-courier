import React from 'react'
import { DefaultOptions, useQueryClient } from '@tanstack/react-query'
import { createContext, useMemo } from 'react'
import { RHookProviderPropsType, ContextType } from '../types'
export const RestHookContext = createContext<ContextType>({})

function RestHookContextProvider({ defaultBaseUrl, otherBaseUrl, defaultOptions, children }: RHookProviderPropsType) {
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
      commonErrorDto: defaultOptions?.errorDto,
    }),
    [defaultBaseUrl, otherBaseUrl, defaultOptions],
  )

  return <RestHookContext.Provider value={contextValueMemo}>{children}</RestHookContext.Provider>
}

export default RestHookContextProvider
