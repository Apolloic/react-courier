import { FunctionComponent, PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient, DefaultOptions } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AxiosQueryContextProvider from "./AxiosQueryContextProvider";
import { RegisterErrorDto } from "..";

export type Unpacked<T> = T extends (infer U)[] ? U : T;

export interface AxiosQueryProviderPropsType extends PropsWithChildren {
  defaultBaseUrl: string;
  otherBaseUrl?: Record<string, string>;
  defaultOptions?: DefaultOptions<RegisterErrorDto> & {
    timeout?: number;
    headers?: Record<string, string>;
    errorDto?: (error: any) => RegisterErrorDto;
  };
}

const queryClient = new QueryClient();

function AxiosQueryProvider(props: AxiosQueryProviderPropsType) {
  return (
    <QueryClientProvider client={queryClient}>
      <AxiosQueryContextProvider
        otherBaseUrl={props.otherBaseUrl}
        defaultOptions={props.defaultOptions}
        defaultBaseUrl={props.defaultBaseUrl}
      >
        {props.children}
      </AxiosQueryContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider >
  );
};

export default AxiosQueryProvider;
