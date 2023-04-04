/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react'
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query'
import {
  CallBackArgsType,
  CreateCourierEntranceType,
  FinalResponseData,
  QueryKeyType,
  QueryParamsType,
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
    const { defaultBaseUrl, otherBaseUrl, commonErrorDto, headers, timeout, middleware } = useContext(CourierContext)

    const Courier = new Axios({
      timeout: CourierObject.timeout ? CourierObject.timeout : timeout ?? 5,
      publicHeaders: { ...headers, ...CourierObject.headers },
      baseUrl: CourierObject.baseUrl
        ? CourierObject.baseUrl !== 'default'
          ? otherBaseUrl?.[CourierObject.baseUrl]
          : defaultBaseUrl
        : defaultBaseUrl,
      options: {
        commonErrorDto: commonErrorDto,
        exteraDto: CourierObject.dto,
        hasDefaultDto: CourierObject?.options?.applyDefaultDto ?? false,
      },
    })

    const endPoint = getFinalEndPoint<T>(CourierObject.endPoint, args?.urlParams)
    const configs: RequestConfigType<
      T['responseDataAfterDto'],
      T['dynamicQueryParams'] extends Record<any, any>
        ? ReturnType<QueryParamsType<T['staticQueryParams'], T['dynamicQueryParams']>>
        : T['staticQueryParams']
    > = {
      method: CourierObject.method,
      queryParams: CourierObject.queryParams
        ? finalQueryParams(CourierObject.queryParams, args?.queryParams)
        : args?.queryParams,
    }

    let result
    if (CourierObject.method !== 'GET') {
      result = useMutation(finalName(CourierObject.name, args?.queryParams, args?.urlParams), async (data: any) => {
        return Courier.request<T['responseDataAfterDto'], RequestType<T>>(
          endPoint,
          {
            method: CourierObject.method,
            data: {
              ...(CourierObject as CourierObjectType).requestData,
              ...data,
            },
            ...configs,
          },
          middleware,
        )
      })
    } else {
      result = useQuery(
        finalName(CourierObject.name, args?.queryParams, args?.urlParams),
        async () => {
          const data = Courier.request<FinalResponseData<T>, RequestType<T>>(endPoint, configs, middleware)
          return data
        },
        CourierObject?.options,
      )
    }

    return result as T['method'] extends 'GET'
      ? UseQueryResult<FinalResponseData<T>, RegisterErrorDto>
      : UseMutationResult<FinalResponseData<T>, RegisterErrorDto, T['dynamicRequestData']>
  }
  useCustom.getQueryKey = (args: QueryKeyType<T>) => finalName(CourierObject.name, args?.queryParams, args?.urlParams)
  return useCustom
}
