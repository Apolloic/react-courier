import { useQuery } from "@tanstack/react-query";
import AxiosQuery, { RequestConfigType } from "./axios";
import { useContext } from "react";
import { AxiosQueryContext } from "./Providers/AxiosQueryProvider";
import {
  CallBackArgsType,
  CreateAxiosQueryHookEntranceType,
  QueryParamsType,
  axiosQueryObjectType,
} from "./hookCreatorType";
import { finalName, finalQueryParams, getFinalEndPoint } from "./hookCreatorUtils";

export const createAxiosQueryHook = <T extends CreateAxiosQueryHookEntranceType>(
  axiosQueryObject: axiosQueryObjectType<T>
) => {
  return (args?: CallBackArgsType<T>) => {
    const baseUrls = useContext(AxiosQueryContext);

    const axiosQuery = new AxiosQuery({
      baseUrl: baseUrls["default"],
      options: {
        exteraDto: axiosQueryObject.dto,
        hasDefaultDto: axiosQueryObject.options?.applyDefaultDto
      }
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
    const useQueryResult = useQuery(
      finalName(axiosQueryObject.name, args?.queryParams, args?.urlParams),
      async () => {
        const data = axiosQuery.request<
          T["responseDataAfterDto"],
          T["dynamicQueryParams"] extends Record<any, any>
          ? ReturnType<QueryParamsType<T["staticQueryParams"], T["dynamicQueryParams"]>>
          : T["staticQueryParams"]
        >(endPoint, configs);
        return data;
      }
    );
    return useQueryResult;
  };
};
