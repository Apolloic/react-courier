/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react'
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import {
  CallBackArgsType,
  CreateCourierEntranceType,
  FinalResponseData,
  QueryKeyType,
  RegisterErrorDto,
  RequestConfigType,
  RequestType,
  CourierObjectType,
} from '../types'
import { finalName, finalQueryParams, getFinalEndPoint } from '../utils'
import { Axios } from './Axios'
import { CourierContext } from '../providers/CourierContextProvider'

export const CreateApi = <T extends CreateCourierEntranceType>(CourierObject: CourierObjectType<T>) => {
  const useCustom = (args?: CallBackArgsType<T>) => {
    const { defaultBaseUrl, otherBaseUrl, commonErrorDto, headers, timeout, middleware, axiosAgentConfig } =
      useContext(CourierContext)

    const options = {
      commonErrorDto: commonErrorDto,
      exteraDto: (CourierObject as any).dto,
      hasDefaultDto: (CourierObject?.options as any)?.applyDefaultDto ?? false,
    }

    const Courier = new Axios({
      timeout: CourierObject.timeout ? CourierObject.timeout : timeout ?? 5,
      publicHeaders: { ...headers, ...CourierObject.headers },
      axiosAgentConfig: { ...axiosAgentConfig, ...CourierObject.axiosAgentConfig },
      baseUrl: CourierObject.baseUrl
        ? CourierObject.baseUrl !== 'default'
          ? otherBaseUrl?.[CourierObject.baseUrl]
          : defaultBaseUrl
        : defaultBaseUrl,
      options,
    })

    const endPoint = getFinalEndPoint<T>(CourierObject.endPoint, args?.urlParams)
    const configs: RequestConfigType<
      T['responseDataAfterDto'],
      T['dynamicQueryParams'] extends {} ? T['staticQueryParams'] & T['dynamicQueryParams'] : T['staticQueryParams']
    > = {
      method: CourierObject.method,
      queryParams: finalQueryParams((CourierObject as any)?.queryParams, (args as any)?.queryParams),
    }

    let result
    if (CourierObject.method !== 'GET') {
      result = useMutation(
        finalName(CourierObject.name, (args as any)?.queryParams, args?.urlParams),
        async (data: T['dynamicRequestData']) => {
          return Courier.request<T['responseDataAfterDto'], RequestType<T>>(
            endPoint,
            {
              method: CourierObject.method,
              data: {
                ...(CourierObject as any).requestData,
                ...data,
              },
              ...configs,
            },
            middleware,
          )
        },
        {
          ...(CourierObject?.options as UseMutationOptions<
            T['responseDataAfterDto'],
            RegisterErrorDto,
            T['dynamicRequestData']
          >),
          ...(args?.options as UseMutationOptions<
            T['responseDataAfterDto'],
            RegisterErrorDto,
            T['dynamicRequestData']
          >),
        },
      )
    } else {
      result = useQuery(
        finalName(CourierObject.name, (args as any)?.queryParams, args?.urlParams),
        async () => {
          const data = Courier.request<FinalResponseData<T>, RequestType<T>>(endPoint, configs, middleware)
          return data
        },
        {
          ...(CourierObject?.options as UseQueryOptions<T['responseDataAfterDto'], RegisterErrorDto>),
          ...(args?.options as UseQueryOptions<T['responseDataAfterDto'], RegisterErrorDto>),
        },
      )
    }

    return result as T['method'] extends 'GET'
      ? UseQueryResult<FinalResponseData<T>, RegisterErrorDto>
      : UseMutationResult<FinalResponseData<T>, RegisterErrorDto, T['dynamicRequestData']>
  }
  useCustom.getQueryKey = (args: QueryKeyType<T>) => finalName(CourierObject.name, args?.queryParams, args?.urlParams)
  return useCustom
}
