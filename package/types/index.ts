import { DefaultOptions, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { AxiosResponse, CreateAxiosDefaults } from 'axios'
import { PropsWithChildren } from 'react'
import { RegisterErrorDto, RegisterOtherBaseUrls } from '..'

export interface CreateCourierEntranceType {
  responseData?: Record<any, any> | unknown
  responseDataAfterDto?: Record<any, any>
  dynamicRequestData?: Record<any, any>
  staticRequestData?: Record<any, any>
  staticQueryParams?: Record<any, any>
  dynamicQueryParams?: Record<any, any>
  urlParams?: Record<any, any>
}

// Utils Start
export type DTO<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<DTO<U>>}` : S

export type DTONested<T> = T extends Array<any>
  ? Array<DTONested<T[number]>>
  : T extends object
  ? {
      [K in keyof T as DTO<K & string>]: DTONested<T[K]>
    }
  : T

// ======================== Start Query Params ===============================
type QueryParamsType<S, D> = D extends Record<any, any>
  ? S extends Record<any, any>
    ? ((args: Partial<D>) => S & Partial<D>) | S
    : (args: Partial<D>) => Partial<D>
  : S

export type CourierObjectTypeQueryParams<T extends CreateCourierEntranceType> = T['staticQueryParams'] extends Record<
  any,
  any
>
  ? {
      queryParams: QueryParamsType<T['staticQueryParams'], T['dynamicQueryParams']>
    }
  : T['dynamicQueryParams'] extends Record<any, any>
  ? {
      queryParams?: QueryParamsType<T['staticQueryParams'], T['dynamicQueryParams']>
    }
  : {
      queryParams?: unknown
    }

// ======================== End Query Params ===============================

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ======================== Start Request Data ===============================

type CourierObjectTypeRequestData<TMethod extends MethodTypes, TSRQ> = TMethod extends 'GET'
  ? {}
  : TSRQ extends Record<any, any>
  ? { requestData: TSRQ }
  : {}

// ======================== End Request Data ===============================

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ========================= Start FinalResponseData ========================
export type FinalResponseData<
  TApplyDefaultDto extends boolean,
  TArgs extends CreateCourierEntranceType,
> = TArgs['responseDataAfterDto'] extends Record<any, any>
  ? TArgs['responseDataAfterDto']
  : TApplyDefaultDto extends boolean
  ? TApplyDefaultDto extends true
    ? DTONested<TArgs['responseData']>
    : TArgs['responseData']
  : TArgs['responseData']

// ========================= End FinalResponseData ========================

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ========================= Start Options ===================================

export type FinalOptionType<
  TMethod extends MethodTypes,
  TApplyDefaultDto extends boolean,
  TArgs extends CreateCourierEntranceType,
> = TMethod extends 'GET'
  ? TApplyDefaultDto extends boolean
    ? { applyDefaultDto?: TApplyDefaultDto } & UseQueryOptions<
        FinalResponseData<TApplyDefaultDto, TArgs>,
        RegisterErrorDto
      >
    : UseQueryOptions<FinalResponseData<TApplyDefaultDto, TArgs>, RegisterErrorDto>
  : TApplyDefaultDto extends boolean
  ? { applyDefaultDto?: TApplyDefaultDto } & UseMutationOptions<
      FinalResponseData<TApplyDefaultDto, TArgs>,
      RegisterErrorDto
    >
  : UseMutationOptions<FinalResponseData<TApplyDefaultDto, TArgs>, RegisterErrorDto>

// ========================= End Options ===================================

// Start Final ===============

type FinalStaticOrDynamic<S, D> = D extends Record<any, any>
  ? S extends Record<any, any>
    ? S & D
    : D
  : S extends Record<any, any>
  ? S
  : unknown

export type FinalQueryParams<S, D> = FinalStaticOrDynamic<S, D>

export type FinalRequestData<S, D> = FinalStaticOrDynamic<S, D>

// End Final ===================

// DTO START =======================

type CourierObjectTypeDTO<
  TApplyDefaultDto extends boolean,
  TArgs extends CreateCourierEntranceType,
> = TArgs['responseDataAfterDto'] extends Record<any, any>
  ? {
      dto: (
        data: TApplyDefaultDto extends true ? DTONested<TArgs['responseData']> : TArgs['responseData'],
      ) => FinalResponseData<TApplyDefaultDto, TArgs>
    }
  : { dto?: (data: unknown) => unknown }

// DTO END ============================
export type EndPointFunction<T> = (params: T) => string

export type MethodTypes = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type axiosAgentConfigType = Omit<CreateAxiosDefaults<any>, 'timeout' | 'baseURL' | 'headers' | 'data'>

export type CourierObjectType<
  TArgs extends CreateCourierEntranceType,
  TMethod extends MethodTypes = 'GET',
  TApplyDefaultDto extends boolean = false,
> = {
  method: TMethod
  config?: {
    applyDefaultDto?: TApplyDefaultDto
    tanStackOptions?: FinalOptionType<TMethod, TApplyDefaultDto, TArgs>
    timeout?: number
    headers?: Record<any, any>
    axiosAgentConfig?: axiosAgentConfigType
  }
  name: TMethod extends 'GET'
    ?
        | ((
            args: TArgs['urlParams'] & TArgs['dynamicQueryParams'] & TArgs['staticQueryParams'],
          ) => (string | number | boolean)[])
        | string[]
    : string[]

  baseUrl?: keyof RegisterOtherBaseUrls | 'default'
  endPoint: TArgs['urlParams'] extends Record<any, any> ? EndPointFunction<TArgs['urlParams']> : string
} & CourierObjectTypeQueryParams<TArgs> &
  CourierObjectTypeRequestData<TMethod, TArgs['staticRequestData']> &
  CourierObjectTypeDTO<TApplyDefaultDto, TArgs>

export type GetHookArgsWithQueryParams<TApplyDefaultDto extends boolean, TArgs extends CreateCourierEntranceType> = {
  queryParams: TArgs['dynamicQueryParams']
  headers?: Record<string, string>
  urlParams?: TArgs['urlParams'] extends Record<any, any> ? TArgs['urlParams'] : unknown
  options?: UseQueryOptions<FinalResponseData<TApplyDefaultDto, TArgs>, RegisterErrorDto>
}

export type GetHookArgsWithoutQueryParams<TApplyDefaultDto extends boolean, TArgs extends CreateCourierEntranceType> = {
  queryParams?: unknown
  headers?: Record<string, string>
  urlParams?: TArgs['urlParams'] extends Record<any, any> ? TArgs['urlParams'] : unknown
  options?: UseQueryOptions<FinalResponseData<TApplyDefaultDto, TArgs>, RegisterErrorDto>
}

export type HookArgs<
  TMethod extends MethodTypes,
  TApplyDefaultDto extends boolean,
  TArgs extends CreateCourierEntranceType,
> = TMethod extends 'GET'
  ? TArgs['dynamicQueryParams'] extends Record<any, any>
    ? GetHookArgsWithQueryParams<TApplyDefaultDto, TArgs>
    : GetHookArgsWithoutQueryParams<TApplyDefaultDto, TArgs>
  : {
      headers?: Record<string, string>
      options?: UseMutationOptions<FinalResponseData<TApplyDefaultDto, TArgs>, RegisterErrorDto>
    }

// Providers
export type MiddelwareType = (data: AxiosResponse<any, any>) => void

export interface CourierProviderPropsType extends PropsWithChildren {
  defaultBaseUrl: string
  middleware?: MiddelwareType
  otherBaseUrl?: Record<keyof RegisterOtherBaseUrls, string>
  dehydratedState?: unknown
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

export type QueryKeyType<T extends CreateCourierEntranceType> = {
  queryParams?: T['dynamicQueryParams']
  urlParams?: T['urlParams']
}
