import {UseQueryOptions} from "@tanstack/react-query";

export declare type DTO<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<DTO<U>>}`
  : S;

export declare type DTONested<T> = T extends Array<any>
  ? Array<DTONested<T[number]>>
  : T extends object
  ? {
      [K in keyof T as DTO<K & string>]: DTONested<T[K]>;
    }
  : T;

export declare type ValueOf<T> = T[keyof T];

export type AQHookTypeHelper<T extends CreateAxiosQueryHookEntranceType> = T;
export type AQMethodTypeHelper<T extends "GET" | "POST" | "PUT" | "PATCH" | "DELETE"> = T;
export interface CreateAxiosQueryHookEntranceType {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endPointArgs?: Record<string, number>;
  responseData: Record<string, any>;
  staticQueryParams?: Record<string, string | number>;
  dynamicQueryParams?: Record<string, string | number>;
  responseDataAfterDto?: Record<string, any>;
  applyDefaultDto?: boolean;
  dynamicRequestData?: Record<any, any>;
  staticRequestData?: Record<any, any>;
}

export declare type EndPointFunction<T> = (params: T) => string;

export declare type QueryParamsType<S, D> = D extends Record<any, any>
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
  baseUrl?: "default" | any;
  method: T["method"];
  endPoint: EndPointFunction<T["endPointArgs"]> | string;
  queryParams?: QueryParamsType<T["staticQueryParams"], T["dynamicQueryParams"]>;

  options?: UseQueryOptions<T["responseDataAfterDto"]> & {
    applyDefaultDto: boolean;
  };
  dto?: (
    data: T["applyDefaultDto"] extends true
      ? DTONested<T["responseData"]>
      : T["responseData"]
  ) => T["responseDataAfterDto"];
} & (T["method"] extends "GET" ? {} : {requestData: T["staticRequestData"]});

export type CallBackArgsType<
  T extends CreateAxiosQueryHookEntranceType = CreateAxiosQueryHookEntranceType
> = {
  urlParams: Record<keyof T["endPointArgs"], string | number>;
  queryParams: T["dynamicQueryParams"];
  requestData?: Record<string, any>;
};

export type RequestType<T extends CreateAxiosQueryHookEntranceType> =
  T["dynamicQueryParams"] extends Record<any, any>
    ? ReturnType<QueryParamsType<T["staticQueryParams"], T["dynamicQueryParams"]>>
    : T["staticQueryParams"];

export type FinalResponseData<T extends CreateAxiosQueryHookEntranceType> =
  T["responseDataAfterDto"] extends unknown
    ? T["responseData"]
    : T["responseDataAfterDto"];
