import {UseQueryOptions} from "@tanstack/react-query";

export type DTO<S extends string> =
  S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<DTO<U>>}`
    : S;

export type DTONested<T> = T extends Array<any>
  ? Array<DTONested<T[number]>>
  : T extends object
  ? {
      [K in keyof T as DTO<K & string>]: DTONested<T[K]>;
    }
  : T;

export declare type ValueOf<T> = T[keyof T];
export type AxiosQueryTypeHelper<
  T extends CreateAxiosQueryHookEntranceType
> = T;
export interface CreateAxiosQueryHookEntranceType {
  endPointArgs?: Record<string, number>;
  responseData: Record<string, any>;
  staticQueryParams?: Record<string, string | number>;
  dynamicQueryParams?: Record<string, string | number>;
  responseDataAfterDto: Record<string, any>;
  applyDefaultDto?: boolean;
}

export type EndPointFunction<T> = (params: T) => string;

export type QueryParamsType<S, D> = D extends Record<
  any,
  any
>
  ? (args: Record<keyof D, ValueOf<D>>) => S & D
  : S;

export type axiosQueryObjectType<
  T extends CreateAxiosQueryHookEntranceType = CreateAxiosQueryHookEntranceType
> = {
  name:
    | ((
        args: T["endPointArgs"] &
          T["dynamicQueryParams"] &
          T["staticQueryParams"]
      ) => (string | number | boolean)[])
    | string[];
  baseUrl?: "default" | any;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endPoint: EndPointFunction<T["endPointArgs"]> | string;
  queryParams?: QueryParamsType<
    T["staticQueryParams"],
    T["dynamicQueryParams"]
  >;
  requestData?: Record<string, any>;
  options?: UseQueryOptions<T["responseDataAfterDto"]> & {
    applyDefaultDto: boolean;
  };
  dto?: (
    data: T["applyDefaultDto"] extends true
      ? DTONested<T["responseData"]>
      : T["responseData"]
  ) => T["responseDataAfterDto"];
};

export type CallBackArgsType<
  T extends CreateAxiosQueryHookEntranceType = CreateAxiosQueryHookEntranceType
> = {
  urlParams: Record<
    keyof T["endPointArgs"],
    string | number
  >;
  queryParams: T["dynamicQueryParams"];
};
