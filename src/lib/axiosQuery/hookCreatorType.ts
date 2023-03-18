import { AxiosQueryProviderPropsType } from "./Providers/AxiosQueryProvider";

export declare type ValueOf<T> = T[keyof T];
export type AxiosQueryTypeHelper<T extends CreateAxiosQueryHookEntranceType> = T;
export interface CreateAxiosQueryHookEntranceType {
  endPointArgs?: Record<string, number>;
  responseData: Array<Record<string, any>> | Record<string, string>;
  staticQueryParams?: Record<string, string | number>;
  dynamicQueryParams?: Record<string, string | number>;
  responseDataAfterDto: Array<Record<string, any>> | Record<string, string>;
}

export type EndPointFunction<T> = (params: T) => string;

export type QueryParamsType<S, D> = D extends Record<any, any>
  ? (args: Record<keyof D, ValueOf<D>>) => S & D
  : S;

export type axiosQueryObjectType<
  T extends CreateAxiosQueryHookEntranceType = CreateAxiosQueryHookEntranceType
> = {
  name:
  | ((
    args: T["endPointArgs"] & T["dynamicQueryParams"] & T["staticQueryParams"]
  ) => (string | number | boolean)[])
  | string[];
  baseUrl: keyof AxiosQueryProviderPropsType["otherBaseUrl"] | "default";
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endPoint: EndPointFunction<T["endPointArgs"]> | string;
  queryParams?: QueryParamsType<T["staticQueryParams"], T["dynamicQueryParams"]>;
  requestData?: Record<string, any>;
  dto?: (data: T['responseData']) => T['responseDataAfterDto'];
  options?: {
    applyDefaultDto: boolean;
  };
};

export type CallBackArgsType<
  T extends CreateAxiosQueryHookEntranceType = CreateAxiosQueryHookEntranceType
> = {
  urlParams: Record<keyof T["endPointArgs"], string | number>;
  queryParams: T["dynamicQueryParams"];
};
