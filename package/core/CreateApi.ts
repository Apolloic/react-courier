/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react'
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query'
import {
  CallBackArgsType,
  CreateAxiosQueryEntranceType,
  FinalResponseData,
  QueryKeyType,
  QueryParamsType,
  RegisterErrorDto,
  RequestConfigType,
  RequestType,
  AxiosQueryObjectType,
} from '../types'
import { finalName, finalQueryParams, getFinalEndPoint } from '../utils'
import { AxiosQuery } from './AxiosQuery'
import { AxiosQueryContext } from '../providers/AxiosQueryContextProvider'

export const CreateApi = <T extends CreateAxiosQueryEntranceType>(AxiosQueryObject: AxiosQueryObjectType<T>) => {
  const useCustom = (args?: CallBackArgsType<T>) => {
    const { defaultBaseUrl, otherBaseUrl, commonErrorDto, headers, timeout, middleware } = useContext(AxiosQueryContext)

    const axiosQuery = new AxiosQuery({
      timeout: AxiosQueryObject.timeout ? AxiosQueryObject.timeout : timeout ?? 5,
      publicHeaders: { ...headers, ...AxiosQueryObject.headers },
      baseUrl: AxiosQueryObject.baseUrl
        ? AxiosQueryObject.baseUrl !== 'default'
          ? otherBaseUrl?.[AxiosQueryObject.baseUrl]
          : defaultBaseUrl
        : defaultBaseUrl,
      options: {
        commonErrorDto: commonErrorDto,
        exteraDto: AxiosQueryObject.dto,
        hasDefaultDto: AxiosQueryObject?.options?.applyDefaultDto ?? false,
      },
    })

    const endPoint = getFinalEndPoint<T>(AxiosQueryObject.endPoint, args?.urlParams)
    const configs: RequestConfigType<
      T['responseDataAfterDto'],
      T['dynamicQueryParams'] extends Record<any, any>
        ? ReturnType<QueryParamsType<T['staticQueryParams'], T['dynamicQueryParams']>>
        : T['staticQueryParams']
    > = {
      method: AxiosQueryObject.method,
      queryParams: AxiosQueryObject.queryParams
        ? finalQueryParams(AxiosQueryObject.queryParams, args?.queryParams)
        : args?.queryParams,
    }

    let result
    if (AxiosQueryObject.method !== 'GET') {
      result = useMutation(finalName(AxiosQueryObject.name, args?.queryParams, args?.urlParams), async (data: any) => {
        return axiosQuery.request<T['responseDataAfterDto'], RequestType<T>>(
          endPoint,
          {
            method: AxiosQueryObject.method,
            data: {
              ...(AxiosQueryObject as AxiosQueryObjectType).requestData,
              ...data,
            },
            ...configs,
          },
          middleware,
        )
      })
    } else {
      result = useQuery(
        finalName(AxiosQueryObject.name, args?.queryParams, args?.urlParams),
        async () => {
          const data = axiosQuery.request<FinalResponseData<T>, RequestType<T>>(endPoint, configs, middleware)
          return data
        },
        AxiosQueryObject?.options,
      )
    }

    return result as T['method'] extends 'GET'
      ? UseQueryResult<FinalResponseData<T>, RegisterErrorDto>
      : UseMutationResult<FinalResponseData<T>, RegisterErrorDto, T['dynamicRequestData']>
  }
  useCustom.getQueryKey = (args: QueryKeyType<T>) =>
    finalName(AxiosQueryObject.name, args?.queryParams, args?.urlParams)
  return useCustom
}
