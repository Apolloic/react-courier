import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import AxiosQueryContextProvider from "./AxiosQueryContextProvider";
import {AxiosQueryProviderPropsType} from "../types";

const queryClient = new QueryClient();

export function AxiosQueryProvider(props: AxiosQueryProviderPropsType) {
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
    </QueryClientProvider>
  );
}
