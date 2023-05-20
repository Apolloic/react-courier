/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react'
import { CourierContext } from '../providers/CourierContextProvider'
import {
  CourierObjectType,
  CreateCourierEntranceType,
  FinalQueryParams,
  FinalRequestData,
  FinalResponseData,
  HookArgs,
  MethodTypes,
  QueryKeyType,
  RegisterErrorDto,
} from '../types'
import { Axios } from './Axios'
import { getFinalEndPoint, getFinalName, getFinalQueryParams } from '../utils'
import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query'

export const CreateApi =
  <TArgs extends CreateCourierEntranceType>() =>
  <TMethod extends MethodTypes, TApplyDefaultDto extends boolean>(
    CourierObject: CourierObjectType<TArgs, TMethod, TApplyDefaultDto>,
  ) => {
    const { method, config, baseUrl, dto, endPoint, queryParams, name } = CourierObject
    const useCustomHook = (hookArgs?: HookArgs<TMethod, TApplyDefaultDto, TArgs>) => {
      const { defaultBaseUrl, otherBaseUrl, commonErrorDto, headers, timeout, axiosAgentConfig, middleware } =
        useContext(CourierContext)

      const options = {
        commonErrorDto: commonErrorDto,
        exteraDto: dto,
        hasDefaultDto: config?.applyDefaultDto ?? false,
      }

      const Courier = new Axios({
        timeout: config?.timeout ? config?.timeout : timeout ?? 5,
        publicHeaders: { ...headers, ...config?.headers },
        axiosAgentConfig: { ...axiosAgentConfig, ...config?.axiosAgentConfig },
        baseUrl: baseUrl ? (baseUrl !== 'default' ? otherBaseUrl?.[baseUrl] : defaultBaseUrl) : defaultBaseUrl,
        options,
      })

      const finalEndPoint = getFinalEndPoint(endPoint, hookArgs?.urlParams)

      const finalAxiosConfigs = {
        method: method,
        queryParams: getFinalQueryParams(queryParams, hookArgs?.queryParams),
      }

      const finalNameForCatch = getFinalName(name, hookArgs?.queryParams, hookArgs?.urlParams)

      let result
      if (method !== 'GET') {
        result = useMutation(
          finalNameForCatch,
          async (data: TArgs['dynamicRequestData']) => {
            return Courier.request<
              FinalResponseData<TApplyDefaultDto, TArgs>,
              FinalQueryParams<TArgs['staticQueryParams'], TArgs['dynamicQueryParams']>,
              FinalRequestData<TArgs['staticRequestData'], TArgs['dynamicRequestData']>
            >(
              finalEndPoint,
              {
                data: {
                  ...(CourierObject as { requestData: TArgs['staticRequestData'] }).requestData,
                  ...data,
                } as FinalRequestData<TArgs['staticRequestData'], TArgs['dynamicRequestData']>,
                ...finalAxiosConfigs,
              },
              middleware,
            )
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
      } else {
        result = useQuery(
          finalNameForCatch,
          async () => {
            const data = Courier.request<
              FinalResponseData<TApplyDefaultDto, TArgs>,
              FinalQueryParams<TArgs['staticQueryParams'], TArgs['dynamicQueryParams']>,
              FinalRequestData<TArgs['staticRequestData'], TArgs['dynamicRequestData']>
            >(finalEndPoint, finalAxiosConfigs, middleware)
            return data
          },
          {
            ...(config?.tanStackOptions as UseQueryOptions<TArgs['responseDataAfterDto'], RegisterErrorDto>),
            ...(hookArgs?.options as UseQueryOptions<TArgs['responseDataAfterDto'], RegisterErrorDto>),
          },
        )
      }

      return result as TMethod extends 'GET'
        ? UseQueryResult<FinalResponseData<TApplyDefaultDto, TArgs>, RegisterErrorDto>
        : UseMutationResult<FinalResponseData<TApplyDefaultDto, TArgs>, RegisterErrorDto, TArgs['dynamicRequestData']>
    }
    useCustomHook.getQueryKey = (args: QueryKeyType<TArgs>) => getFinalName(name, args.queryParams, args.urlParams)
    return useCustomHook
  }
