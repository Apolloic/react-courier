import { DefaultOptions, useQueryClient } from "@tanstack/react-query";
import { createContext, useMemo } from "react";
import { RegisterErrorDtoType } from "..";
import { AxiosQueryProviderPropsType } from "./AxiosQueryProvider";


type ContextType = {
  defaultBaseUrl?: string,
  otherBaseUrl?: Record<string, string>
  headers?: Record<string, string>
  timeout?: number,
  commonErrorDto?: (error: unknown) => RegisterErrorDtoType
}

export const AxiosQueryContext = createContext<ContextType>({});

function AxiosQueryContextProvider({
  defaultBaseUrl,
  otherBaseUrl,
  defaultOptions,
  children,
}: AxiosQueryProviderPropsType) {
  const queryClient = useQueryClient();


  if (defaultOptions) {
    queryClient.setDefaultOptions({
      queries: {
        retry: 2,
        ...defaultOptions.queries as DefaultOptions['queries']
      },
      mutations: {
        ...defaultOptions.mutations as DefaultOptions['mutations']
      },
    });
  }
  const contextValueMemo = useMemo(
    () => ({
      defaultBaseUrl: defaultBaseUrl,
      otherBaseUrl,
      headers: defaultOptions?.headers,
      timeout: defaultOptions?.timeout,
      commonErrorDto: defaultOptions?.errorDto
    }),
    [defaultBaseUrl, otherBaseUrl]
  );



  return (
    <AxiosQueryContext.Provider value={contextValueMemo}>
      {children}
    </AxiosQueryContext.Provider>
  );
};

export default AxiosQueryContextProvider;
