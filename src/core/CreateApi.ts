/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react'
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query'
import {
  CallBackArgsType,
  CreateRestHookEntranceType,
  FinalResponseData,
  QueryKeyType,
  QueryParamsType,
  RequestConfigType,
  RequestType,
  RHookObjectType,
} from '../types/types'
import { finalName, finalQueryParams, getFinalEndPoint } from '../utils'
import { AxiosQuery } from './AxiosQuery'
import { RegisterErrorDto } from '..'
import { RestHookContext } from '../providers/RestHookContextProvider'

export const CreateRestHook = <T extends CreateRestHookEntranceType>(RHookObjectType: RHookObjectType<T>) => {
  const useCustom = (args?: CallBackArgsType<T>) => {
    const { defaultBaseUrl, otherBaseUrl, commonErrorDto, headers, timeout, middleware } = useContext(RestHookContext)

    const axiosQuery = new AxiosQuery({
      timeout: RHookObjectType.timeout ? RHookObjectType.timeout : timeout ?? 5,
      publicHeaders: { ...headers, ...RHookObjectType.headers },
      baseUrl: RHookObjectType.baseUrl
        ? RHookObjectType.baseUrl !== 'default'
          ? otherBaseUrl?.[RHookObjectType.baseUrl]
          : defaultBaseUrl
        : defaultBaseUrl,
      options: {
        commonErrorDto: commonErrorDto,
        exteraDto: RHookObjectType.dto,
        hasDefaultDto: RHookObjectType?.options?.applyDefaultDto ?? false,
      },
    })

    const endPoint = getFinalEndPoint<T>(RHookObjectType.endPoint, args?.urlParams)
    const configs: RequestConfigType<
      T['responseDataAfterDto'],
      T['dynamicQueryParams'] extends Record<any, any>
        ? ReturnType<QueryParamsType<T['staticQueryParams'], T['dynamicQueryParams']>>
        : T['staticQueryParams']
    > = {
      method: RHookObjectType.method,
      queryParams: RHookObjectType.queryParams
        ? finalQueryParams(RHookObjectType.queryParams, args?.queryParams)
        : args?.queryParams,
    }

    let result
    if (RHookObjectType.method !== 'GET') {
      result = useMutation(finalName(RHookObjectType.name, args?.queryParams, args?.urlParams), async (data: any) => {
        return axiosQuery.request<T['responseDataAfterDto'], RequestType<T>>(
          endPoint,
          {
            method: RHookObjectType.method,
            data: {
              ...(RHookObjectType as RHookObjectType).requestData,
              ...data,
            },
            ...configs,
          },
          middleware,
        )
      })
    } else {
      result = useQuery(
        finalName(RHookObjectType.name, args?.queryParams, args?.urlParams),
        async () => {
          const data = axiosQuery.request<FinalResponseData<T>, RequestType<T>>(endPoint, configs, middleware)
          return data
        },
        RHookObjectType?.options,
      )
    }

    return result as T['method'] extends 'GET'
      ? UseQueryResult<FinalResponseData<T>, RegisterErrorDto>
      : UseMutationResult<FinalResponseData<T>, RegisterErrorDto, T['dynamicRequestData']>
  }
  useCustom.getQueryKey = (args: QueryKeyType<T>) => finalName(RHookObjectType.name, args?.queryParams, args?.urlParams)
  return useCustom
}
