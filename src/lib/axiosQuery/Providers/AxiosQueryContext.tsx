import {
  QueryClientConfig,
  useQueryClient,
} from "@tanstack/react-query";
import {
  PropsWithChildren,
  createContext,
  useMemo,
} from "react";

export interface AxiosQueryContextProviderPropsType<
  T extends Record<string, string> = {}
> extends PropsWithChildren {
  defaultBaseUrl: string;
  otherBaseUrl: T;
  defaultOptions?: QueryClientConfig["defaultOptions"];
}

export const AxiosQueryContext = createContext<
  Record<string, string>
>({});

const AxiosQueryContextProvider = <
  T extends Record<string, string> = {}
>({
  defaultBaseUrl,
  otherBaseUrl,
  defaultOptions,
  children,
}: AxiosQueryContextProviderPropsType<T>) => {
  const queryClient = useQueryClient();
  if (defaultOptions) {
    queryClient.setDefaultOptions(defaultOptions);
  }
  const baseUrlsMemo = useMemo(
    () => ({default: defaultBaseUrl, ...otherBaseUrl}),
    [defaultBaseUrl, otherBaseUrl]
  );
  return (
    <AxiosQueryContext.Provider value={baseUrlsMemo}>
      {children}
    </AxiosQueryContext.Provider>
  );
};

export default AxiosQueryContextProvider;
