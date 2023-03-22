import {PropsWithChildren} from "react";
import {QueryClientProvider, QueryClient, DefaultOptions} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import AxiosQueryContextProvider from "./AxiosQueryContext";

export type Unpacked<T> = T extends (infer U)[] ? U : T;

export interface AxiosQueryProviderPropsType<T extends string> extends PropsWithChildren {
  defaultBaseUrl: string;
  otherBaseUrl: Record<Unpacked<T>, string>;
  defaultOptions?: DefaultOptions<any>;
  headers?: Record<string, string>;
  timeout?: number;
}

const queryClient = new QueryClient();

const AxiosQueryProvider = <T extends string>({
  children,
  defaultBaseUrl,
  otherBaseUrl,
  defaultOptions,
  timeout,
  headers,
}: AxiosQueryProviderPropsType<T>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AxiosQueryContextProvider
        timeout={timeout ?? 5}
        headers={headers ?? {}}
        defaultBaseUrl={defaultBaseUrl}
        otherBaseUrl={otherBaseUrl}
        defaultOptions={defaultOptions}
      >
        {children}
      </AxiosQueryContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default AxiosQueryProvider;
