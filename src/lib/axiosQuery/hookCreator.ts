import _ from "lodash";

import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import AxiosQuery, {RequestConfigType} from "./axios";
import {useContext} from "react";
import {
  CallBackArgsType,
  CreateAxiosQueryHookEntranceType,
  FinalResponseData,
  QueryParamsType,
  RequestType,
  axiosQueryObjectType,
} from "./hookCreatorType";
import {finalName, finalQueryParams, getFinalEndPoint} from "./hookCreatorUtils";
import {AxiosQueryContext} from "./Providers/AxiosQueryContext";

type QueryKeyType<T extends CreateAxiosQueryHookEntranceType> = {
  queryParams: T["dynamicQueryParams"];
  urlParams: T["endPointArgs"];
};

export const createAxiosQueryHook = <T extends CreateAxiosQueryHookEntranceType>(
  axiosQueryObject: axiosQueryObjectType<T>
) => {
  const useCustom = (args?: CallBackArgsType<T>) => {
    const {
      defaultBaseUrl,
      otherBaseUrl,
      headers: commonHeaders,
      timeout: commonTimeout,
    } = useContext(AxiosQueryContext);
    const axiosQuery = new AxiosQuery({
      timeout: axiosQueryObject.timeout ? axiosQueryObject.timeout : commonTimeout,
      publicHeaders: {...commonHeaders, ...axiosQueryObject.headers},
      baseUrl: axiosQueryObject.baseUrl
        ? otherBaseUrl[axiosQueryObject.baseUrl]
        : defaultBaseUrl,
      options: {
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
      ? UseQueryResult<FinalResponseData<T>, any>
      : UseMutationResult<FinalResponseData<T>, any, T["dynamicRequestData"]>;
  };
  useCustom.getQueryKey = (args: QueryKeyType<T>) =>
    finalName(axiosQueryObject.name, args?.queryParams, args?.urlParams);
  return useCustom;
};
