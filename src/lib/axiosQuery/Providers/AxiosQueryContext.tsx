import {QueryClientConfig, useQueryClient} from "@tanstack/react-query";
import {PropsWithChildren, createContext, useMemo} from "react";

export interface AxiosQueryContextProviderPropsType<T extends Record<string, string> = {}>
  extends PropsWithChildren {
  defaultBaseUrl: string;
  otherBaseUrl: T;
  headers?: Record<string, string>;
  defaultOptions?: QueryClientConfig["defaultOptions"];
  timeout?: number;
}

export const AxiosQueryContext = createContext<Record<any, any>>({});

const AxiosQueryContextProvider = <T extends Record<string, string> = {}>({
  defaultBaseUrl,
  otherBaseUrl,
  timeout,
  defaultOptions,
  headers,
  children,
}: AxiosQueryContextProviderPropsType<T>) => {
  const queryClient = useQueryClient();

  if (defaultOptions) {
    queryClient.setDefaultOptions({
      queries: {
        retry: 2,
        ...defaultOptions.queries,
      },
      mutations: {
        ...defaultOptions.mutations,
      },
    });
  }
  const contextValueMemo = useMemo(
    () => ({
      defaultBaseUrl: defaultBaseUrl,
      otherBaseUrl,
      headers,
      timeout,
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
