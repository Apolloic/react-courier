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

export const createAxiosQueryHook = <T extends CreateAxiosQueryHookEntranceType>(
  axiosQueryObject: axiosQueryObjectType<T>
) => {
  return (args?: CallBackArgsType<T>) => {
    const baseUrls = useContext(AxiosQueryContext);

    const axiosQuery = new AxiosQuery({
      baseUrl: axiosQueryObject.baseUrl
        ? baseUrls[axiosQueryObject.baseUrl]
        : baseUrls["default"],
      options: {
        exteraDto: axiosQueryObject.dto,
        hasDefaultDto: axiosQueryObject?.options?.applyDefaultDto,
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
    return result as axiosQueryObjectType["method"] extends "GET"
      ? UseQueryResult<FinalResponseData<T>>
      : UseMutationResult<FinalResponseData<T>, unknown, T["dynamicRequestData"]>;
  };
};
