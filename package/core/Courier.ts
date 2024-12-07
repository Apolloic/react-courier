/* eslint-disable react-hooks/rules-of-hooks */
import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { useContext } from 'react'
import { RegisterErrorDto } from '..'
import { CourierContext } from '../providers/CourierContextProvider'
import {
  CourierObjectType,
  CreateCourierEntranceType,
  FinalQueryParams,
  FinalRequestData,
  FinalResponseData,
  GetHookArgsWithQueryParams,
  HookArgs,
  MethodTypes,
  QueryKeyType,
} from '../types'
import { getFinalEndPoint, getFinalName, getFinalQueryParams } from '../utils'
import { Axios } from './Axios'

const chooseMutationHttpMethod = <
  TArgs extends CreateCourierEntranceType,
  TMethod extends MethodTypes,
  TApplyDefaultDto extends boolean = false,
>({
  finalAxiosConfigs,
  courier,
  courierObject,
  middleware,
  mutateData,
  method,
}: {
  finalAxiosConfigs: any
  courier: Axios
  courierObject: CourierObjectType<TArgs, TMethod, TApplyDefaultDto>
  middleware: any
  method: MethodTypes
  mutateData: {
    requestData: TArgs['dynamicRequestData']
    queryParams: TArgs['dynamicQueryParams']
    urlParams: TArgs['urlParams']
  }
}) => {
  const { endPoint, queryParams } = courierObject

  const finalEndPoint = getFinalEndPoint(endPoint, mutateData.urlParams)

  finalAxiosConfigs = {
    method: method,
    queryParams: getFinalQueryParams(queryParams, mutateData?.queryParams),
  }

  return courier.request<
    FinalResponseData<TApplyDefaultDto, TArgs>,
    FinalQueryParams<TArgs['staticQueryParams'], TArgs['dynamicQueryParams']>,
    FinalRequestData<TArgs['staticRequestData'], TArgs['dynamicRequestData']>
  >(
    finalEndPoint,
    {
      data: {
        ...(courierObject as { requestData: TArgs['staticRequestData'] }).requestData,
        ...mutateData.requestData,
      } as FinalRequestData<TArgs['staticRequestData'], TArgs['dynamicRequestData']>,
      ...finalAxiosConfigs,
    },
    middleware,
  )
}

const createMutationHook = <
  TArgs extends CreateCourierEntranceType,
  TMethod extends MethodTypes,
  TApplyDefaultDto extends boolean = false,
>({
  courierObject,
  hookArgs,
  apiCallMethod,
}: {
  courierObject: CourierObjectType<TArgs, TMethod, TApplyDefaultDto>
  hookArgs?: HookArgs<TMethod, TApplyDefaultDto, TArgs>
  apiCallMethod: (params: Parameters<typeof chooseMutationHttpMethod>[0]) => Promise<>
}) => {
  const { name, config } = courierObject

  return useMutation(
    name as string[],
    async (mutateData: {
      requestData: TArgs['dynamicRequestData']
      queryParams: TArgs['dynamicQueryParams']
      urlParams: TArgs['urlParams']
    }) => {

      TODO: 
      // apiCallMethod({ courier, courierObject, finalAxiosConfigs, method, middleware, mutateData })
    },
    {
      ...(config?.tanStackOptions as UseMutationOptions<
        TArgs['responseDataAfterDto'],
        RegisterErrorDto,
        TArgs['dynamicRequestData']
      >),
      ...(hookArgs?.options as UseMutationOptions<
        TArgs['responseDataAfterDto'],
        RegisterErrorDto,
        TArgs['dynamicRequestData']
      >),
    },
  )
}

const chooseQueryHttpMethod = <TArgs extends CreateCourierEntranceType, TApplyDefaultDto extends boolean = false>({
  finalAxiosConfigs,
  finalEndPoint,
  courier,
  middleware,
}: {
  finalEndPoint: string
  finalAxiosConfigs: any
  courier: Axios
  middleware: any
}) => {
  return courier.request<
    FinalResponseData<TApplyDefaultDto, TArgs>,
    FinalQueryParams<TArgs['staticQueryParams'], TArgs['dynamicQueryParams']>,
    FinalRequestData<TArgs['staticRequestData'], TArgs['dynamicRequestData']>
  >(finalEndPoint, finalAxiosConfigs, middleware)
}

const createQueryHook = <
  TArgs extends CreateCourierEntranceType,
  TMethod extends MethodTypes,
  TApplyDefaultDto extends boolean = false,
>({
  hookArgs,
  courierObject,
  finalNameForCatch,
  apiCallMethod,
}: {
  courierObject: CourierObjectType<TArgs, TMethod, TApplyDefaultDto>
  hookArgs?: HookArgs<TMethod, TApplyDefaultDto, TArgs>
  finalNameForCatch: any
  // TODO: 
  // apiCallMethod: () => Promise<>
}) => {
  return useQuery(
    finalNameForCatch,
    async () => {
      // TODO: 
      const data = apiCallMethod()
      return data
    },
    {
      ...(courierObject.config?.tanStackOptions as UseQueryOptions<TArgs['responseDataAfterDto'], RegisterErrorDto>),
      ...(hookArgs?.options as UseQueryOptions<TArgs['responseDataAfterDto'], RegisterErrorDto>),
    },
  )
}

const buildCustomHook = <
  TArgs extends CreateCourierEntranceType,
  TMethod extends MethodTypes,
  TApplyDefaultDto extends boolean = false,
>(
  courierObject: CourierObjectType<TArgs, TMethod, TApplyDefaultDto>,
  hookArgs?: HookArgs<TMethod, TApplyDefaultDto, TArgs>,
) => {
  const { defaultBaseUrl, otherBaseUrl, commonErrorDto, headers, timeout, axiosAgentConfig, middleware } =
    useContext(CourierContext)

  const { method, config, baseUrl, dto, endPoint, queryParams, name } = courierObject

  const options = {
    commonErrorDto: commonErrorDto,
    exteraDto: dto,
    hasDefaultDto: config?.applyDefaultDto ?? false,
  }

  const courier = new Axios({
    timeout: config?.timeout ? config?.timeout : timeout ?? 5,
    publicHeaders: { ...headers, ...config?.headers, ...hookArgs?.headers },
    axiosAgentConfig: { ...axiosAgentConfig, ...config?.axiosAgentConfig },
    baseUrl: baseUrl ? (baseUrl !== 'default' ? otherBaseUrl?.[baseUrl] : defaultBaseUrl) : defaultBaseUrl,
    options,
  })

  let finalAxiosConfigs: any
  let finalNameForCatch

  let result

  let httpClientMethod

  if (method !== 'GET') {
    httpClientMethod = (payload: {
      requestData: TArgs['dynamicRequestData']
      queryParams: TArgs['dynamicQueryParams']
      urlParams: TArgs['urlParams']
    }) =>
      chooseMutationHttpMethod({
        courier,
        courierObject,
        finalAxiosConfigs,
        method,
        middleware,
        mutateData: payload,
      })

    result = createMutationHook({
        // TODO: 
      courierObject,
      hookArgs,
    })
  } else {
    const finalEndPoint = getFinalEndPoint(
      endPoint,
      (hookArgs as GetHookArgsWithQueryParams<TApplyDefaultDto, TArgs>)?.urlParams,
    )
    finalAxiosConfigs = {
      method: method,
      queryParams: getFinalQueryParams(
        queryParams,
        (hookArgs as GetHookArgsWithQueryParams<TApplyDefaultDto, TArgs>)?.queryParams,
      ),
    }

    finalNameForCatch = getFinalName(
      name,
      (hookArgs as GetHookArgsWithQueryParams<TApplyDefaultDto, TArgs>)?.queryParams,
      (hookArgs as GetHookArgsWithQueryParams<TApplyDefaultDto, TArgs>)?.urlParams,
    )
      .map(String)
      .filter(Boolean)

    httpClientMethod = () =>
      chooseQueryHttpMethod({
        finalEndPoint,
        courier,
        finalAxiosConfigs,
        middleware,
      })

    result = createQueryHook({
      courierObject,
      finalNameForCatch,
      hookArgs,
    })
  }

  const getQueryKey = (args: QueryKeyType<TArgs>) =>
    getFinalName(name, args.queryParams, args.urlParams).map(String).filter(Boolean)

  result = { ...result, getQueryKey, getHttpClient: httpClientMethod }

  return result as TMethod extends 'GET'
    ? UseQueryResult<FinalResponseData<TApplyDefaultDto, TArgs>, RegisterErrorDto> & {
        getQueryKey: typeof getQueryKey
        getHttpClient: () => Axios
      }
    : UseMutationResult<
        FinalResponseData<TApplyDefaultDto, TArgs>,
        RegisterErrorDto,
        {
          requestData: TArgs['dynamicRequestData']
          queryParams: TArgs['dynamicQueryParams']
          urlParams: TArgs['urlParams']
        }
      > & {
        getQueryKey: typeof getQueryKey
        getHttpClientMethod: (payload: {
          requestData: TArgs['dynamicRequestData']
          queryParams: TArgs['dynamicQueryParams']
          urlParams: TArgs['urlParams']
        }) => Promise<any>
      }
}

export const CreateApi =
  <TArgs extends CreateCourierEntranceType>() =>
  <TMethod extends MethodTypes, TApplyDefaultDto extends boolean = false>(
    courierObject: CourierObjectType<TArgs, TMethod, TApplyDefaultDto>,
  ) => {
    const useCustomHook = buildCustomHook(courierObject)

    return useCustomHook
  }
