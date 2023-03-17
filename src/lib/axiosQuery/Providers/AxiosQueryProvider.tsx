import {PropsWithChildren, createContext, useMemo} from "react";
import {QueryClientProvider, QueryClient, QueryClientConfig} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export interface AxiosQueryProviderPropsType<T extends Record<string, string> = {}>
  extends PropsWithChildren {
  defaultBaseUrl: string;
  otherBaseUrl: T;
  defaultOptions?: QueryClientConfig["defaultOptions"];
}

const queryClient = new QueryClient();

export const AxiosQueryContext = createContext<Record<string, string>>({});

const AxiosQueryProvider = <T extends Record<string, string>>({
  children,
  defaultBaseUrl,
  otherBaseUrl,
  defaultOptions,
}: AxiosQueryProviderPropsType<T>) => {
  const baseUrlsMemo = useMemo(
    () => ({default: defaultBaseUrl, ...otherBaseUrl}),
    [defaultBaseUrl, otherBaseUrl]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AxiosQueryContext.Provider value={baseUrlsMemo}>
        {children}
        <ReactQueryDevtools />
      </AxiosQueryContext.Provider>
    </QueryClientProvider>
  );
};

export default AxiosQueryProvider;
