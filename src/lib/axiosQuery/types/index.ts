import {DefaultOptions, UseQueryOptions} from "@tanstack/react-query";
import {PropsWithChildren} from "react";
import {AxiosRequestConfig} from "axios";
import {RegisterErrorDto, RegisterOtherBaseUrls} from "..";

export declare type DTO<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<DTO<U>>}`
  : S;

export type Unpacked<T> = T extends (infer U)[] ? U : T;

export type QueryKeyType<T extends CreateAxiosQueryHookEntranceType> = {
  queryParams: T["dynamicQueryParams"];
  urlParams: T["endPointArgs"];
};

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
  baseUrl?: keyof RegisterOtherBaseUrls | "default";
  method: T["method"];
  endPoint: EndPointFunction<T["endPointArgs"]> | string;
  queryParams?: QueryParamsType<T["staticQueryParams"], T["dynamicQueryParams"]>;
  options?: UseQueryOptions<T["responseDataAfterDto"], RegisterErrorDto> & {
    applyDefaultDto?: boolean;
  };
  headers?: Record<string, string>;
  timeout?: number;
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

export interface AxiosQueryProviderPropsType extends PropsWithChildren {
  defaultBaseUrl: string;
  otherBaseUrl?: Record<keyof RegisterOtherBaseUrls, string>;
  defaultOptions?: DefaultOptions<RegisterErrorDto> & {
    timeout?: number;
    headers?: Record<string, string>;
    errorDto?: (error: any) => RegisterErrorDto;
  };
}

export type ContextType = {
  defaultBaseUrl?: AxiosQueryProviderPropsType["defaultBaseUrl"];
  otherBaseUrl?: AxiosQueryProviderPropsType["otherBaseUrl"];
  headers?: Record<string, string>;
  timeout?: number;
  commonErrorDto?: (error: any) => RegisterErrorDto;
};

export type MultipleBaseUrlType = Record<string, string>;
export type BaseUrlType = string | MultipleBaseUrlType;

export interface ConstructorArgsType<BaseUrl> {
  baseUrl?: BaseUrl;
  timeout: number;
  options?: {
    hasDefaultDto?: boolean;
    commonErrorDto?: (error: any) => RegisterErrorDto;
    exteraDto?: (data: any) => any;
  };
  publicHeaders?: Record<string, string>;
}

export interface RequestConfigType<D = any, Q = any> extends AxiosRequestConfig {
  data?: D;
  queryParams?: Q;
}
