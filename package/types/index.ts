import { DefaultOptions, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios'

export interface RegisterErrorDto {
  // Register Error DTO
}
export interface RegisterOtherBaseUrls {
  // Register Other Base Urls
}

export type FinalResponseData<T extends CreateCourierEntranceType> = T['responseDataAfterDto'] extends Record<any, any>
  ? T['responseDataAfterDto']
  : T['applyDefaultDto'] extends boolean
  ? T['applyDefaultDto'] extends true
    ? DTONested<T['responseData']>
    : T['responseData']
  : T['responseData']

export type FinalOptionType<T extends CreateCourierEntranceType> = T['method'] extends 'GET'
  ? T['applyDefaultDto'] extends boolean
    ? { applyDefaultDto: T['applyDefaultDto'] } & UseQueryOptions<FinalResponseData<T>, RegisterErrorDto>
    : UseQueryOptions<FinalResponseData<T>, RegisterErrorDto>
  : T['applyDefaultDto'] extends boolean
  ? { applyDefaultDto: T['applyDefaultDto'] } & UseMutationOptions<FinalResponseData<T>, RegisterErrorDto>
  : UseMutationOptions<FinalResponseData<T>, RegisterErrorDto>

export type DTO<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<DTO<U>>}` : S

export type Unpacked<T> = T extends (infer U)[] ? U : T

export type QueryKeyType<T extends CreateCourierEntranceType> = {
  queryParams: T['dynamicQueryParams']
  urlParams: T['endPointArgs']
}

export type DTONested<T> = T extends Array<any>
  ? Array<DTONested<T[number]>>
  : T extends object
  ? {
      [K in keyof T as DTO<K & string>]: DTONested<T[K]>
    }
  : T

export type ValueOf<T> = T[keyof T]

export type CourierTypeHelper<T extends CreateCourierEntranceType> = T
export type CourierMethodTypeHelper<T extends 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'> = T

export interface CreateCourierEntranceType {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  endPointArgs?: Record<any, any>
  responseData: Record<any, any>
  staticQueryParams?: Record<any, any>
  dynamicQueryParams?: Record<any, any>
  responseDataAfterDto?: Record<any, any>
  applyDefaultDto?: boolean
  dynamicRequestData?: Record<any, any>
  staticRequestData?: Record<any, any>
}

export type EndPointFunction<T> = (params: T) => string

export type QueryParamsType<S, D> = D extends {}
  ? S extends {}
    ? ((args: Partial<D>) => S & Partial<D>) | S
    : (args: Partial<D>) => Partial<D>
  : S

export type FinalQueryParams<S, D> = D extends {} ? S & D : S

type CourierObjectTypeDTO<T extends CreateCourierEntranceType> = T['responseDataAfterDto'] extends Record<any, any>
  ? {
      dto: (
        data: T['applyDefaultDto'] extends true ? DTONested<T['responseData']> : T['responseData'],
      ) => FinalResponseData<T>
    }
  : {}

type CourierObjectTypeRequestData<T extends CreateCourierEntranceType> = T['method'] extends 'GET'
  ? {}
  : T['staticRequestData'] extends {}
  ? { requestData: T['staticRequestData'] }
  : {}

type CourierObjectTypeQueryParams<T extends CreateCourierEntranceType> = T['staticQueryParams'] extends {}
  ? {
      queryParams: QueryParamsType<T['staticQueryParams'], T['dynamicQueryParams']>
    }
  : T['dynamicQueryParams'] extends {}
  ? {
      queryParams?: QueryParamsType<T['staticQueryParams'], T['dynamicQueryParams']>
    }
  : {}

export type CourierObjectType<T extends CreateCourierEntranceType = CreateCourierEntranceType> = {
  name:
    | ((args: T['endPointArgs'] & T['dynamicQueryParams'] & T['staticQueryParams']) => (string | number | boolean)[])
    | string[]
  baseUrl?: keyof RegisterOtherBaseUrls | 'default'
  method: T['method']
  endPoint: T['endPointArgs'] extends {} ? EndPointFunction<T['endPointArgs']> : string
  options?: FinalOptionType<T>
  headers?: Record<string, string>
  axiosAgentConfig?: axiosAgentConfigType
  timeout?: number
} & CourierObjectTypeRequestData<T> &
  CourierObjectTypeDTO<T> &
  CourierObjectTypeQueryParams<T>

export type CallBackArgsType<T extends CreateCourierEntranceType = CreateCourierEntranceType> = {
  urlParams?: Record<keyof T['endPointArgs'], string | number>
  options?: T['method'] extends 'GET'
    ? UseQueryOptions<FinalResponseData<T>, RegisterErrorDto>
    : UseMutationOptions<FinalResponseData<T>, RegisterErrorDto>
} & (T['dynamicQueryParams'] extends {} ? { queryParams: T['dynamicQueryParams'] } : {})

export type RequestType<T extends CreateCourierEntranceType> = FinalQueryParams<
  T['staticQueryParams'],
  T['dynamicQueryParams']
>

export type MiddelwareType = (data: AxiosResponse<any, any>) => void

type axiosAgentConfigType = Omit<CreateAxiosDefaults<any>, 'timeout' | 'baseURL' | 'headers' | 'data'>

export interface CourierProviderPropsType extends PropsWithChildren {
  defaultBaseUrl: string
  middleware?: MiddelwareType
  otherBaseUrl?: Record<keyof RegisterOtherBaseUrls, string>
  defaultOptions?: DefaultOptions<RegisterErrorDto> & {
    timeout?: number
    headers?: Record<string, string>
    errorDto?: (error: any) => RegisterErrorDto
    axiosAgentConfig?: axiosAgentConfigType
  }
}

export type ContextType = {
  defaultBaseUrl?: CourierProviderPropsType['defaultBaseUrl']
  otherBaseUrl?: CourierProviderPropsType['otherBaseUrl']
  axiosAgentConfig?: axiosAgentConfigType
  headers?: Record<string, string>
  timeout?: number
  commonErrorDto?: (error: any) => RegisterErrorDto
  middleware?: MiddelwareType
}

export type MultipleBaseUrlType = Record<string, string>
export type BaseUrlType = string | MultipleBaseUrlType

export interface ConstructorArgsType<BaseUrl> {
  baseUrl?: BaseUrl
  axiosAgentConfig: CreateAxiosDefaults<any>
  timeout: number
  options?: {
    hasDefaultDto?: boolean
    commonErrorDto?: (error: any) => RegisterErrorDto
    exteraDto?: (data: any) => any
  }
  publicHeaders?: any
}

export interface RequestConfigType<D = any, Q = any> extends AxiosRequestConfig {
  data?: D
  queryParams?: Q
}
export type FunctionType = (data?: any) => any
