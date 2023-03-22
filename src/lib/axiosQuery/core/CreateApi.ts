import _ from "lodash";
import {useContext} from "react";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  CallBackArgsType,
  CreateAxiosQueryHookEntranceType,
  FinalResponseData,
  QueryKeyType,
  QueryParamsType,
  RequestConfigType,
  RequestType,
  axiosQueryObjectType,
} from "../types";
import {finalName, finalQueryParams, getFinalEndPoint} from "../utils";
import {AxiosQueryContext} from "../Providers";
import {AxiosQuery} from "./AxiosQuery";
import {RegisterErrorDto} from "..";

export const CreateApi = <T extends CreateAxiosQueryHookEntranceType>(
  axiosQueryObject: axiosQueryObjectType<T>
) => {
  const useCustom = (args?: CallBackArgsType<T>) => {
    const {defaultBaseUrl, otherBaseUrl, commonErrorDto, headers, timeout} =
      useContext(AxiosQueryContext);

    const axiosQuery = new AxiosQuery({
      timeout: axiosQueryObject.timeout ? axiosQueryObject.timeout : timeout ?? 5,
      publicHeaders: {...headers, ...axiosQueryObject.headers},
      baseUrl: axiosQueryObject.baseUrl
        ? axiosQueryObject.baseUrl !== "default"
          ? otherBaseUrl?.[axiosQueryObject.baseUrl]
          : defaultBaseUrl
        : defaultBaseUrl,
      options: {
        commonErrorDto: commonErrorDto,
        exteraDto: axiosQueryObject.dto,
        hasDefaultDto: axiosQueryObject?.options?.applyDefaultDto ?? false,
      },
    });

    const endPoint = getFinalEndPoint<T>(axiosQueryObject.endPoint, args?.urlParams!);
    const configs: RequestConfigType<
      T["responseDataAfterDto"],
      T["dynamicQueryParams"] extends Record<any, any>
        ? ReturnType<QueryParamsType<T["staticQueryParams"], T["dynamicQueryParams"]>>
        : T["staticQueryParams"]
    > = {
      method: axiosQueryObject.method,
      queryParams: axiosQueryObject.queryParams
        ? finalQueryParams(axiosQueryObject.queryParams, args?.queryParams)
        : args?.queryParams,
    };

    let result;
    if (axiosQueryObject.method !== "GET") {
      result = useMutation(
        finalName(axiosQueryObject.name, args?.queryParams, args?.urlParams),
        async (data: any) => {
          return axiosQuery.request<T["responseDataAfterDto"], RequestType<T>>(endPoint, {
            method: axiosQueryObject.method,
            data: {...(axiosQueryObject as axiosQueryObjectType).requestData, ...data},
            ...configs,
          });
        }
      );
    } else {
      result = useQuery(
        finalName(axiosQueryObject.name, args?.queryParams, args?.urlParams),
        async () => {
          const data = axiosQuery.request<FinalResponseData<T>, RequestType<T>>(
            endPoint,
            configs
          );
          return data;
        },
        axiosQueryObject?.options
      );
    }

    return result as T["method"] extends "GET"
      ? UseQueryResult<FinalResponseData<T>, RegisterErrorDto>
      : UseMutationResult<
          FinalResponseData<T>,
          RegisterErrorDto,
          T["dynamicRequestData"]
        >;
  };
  useCustom.getQueryKey = (args: QueryKeyType<T>) =>
    finalName(axiosQueryObject.name, args?.queryParams, args?.urlParams);
  return useCustom;
};
