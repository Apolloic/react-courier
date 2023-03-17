import {camelCase, isArray, isFunction} from "lodash";
import {
  CallBackArgsType,
  CreateAxiosQueryHookEntranceType,
  EndPointFunction,
  axiosQueryObjectType,
} from "./hookCreatorType";

export const getFinalEndPoint = <T extends CreateAxiosQueryHookEntranceType>(
  endPoint: string | EndPointFunction<T["endPointArgs"]>,
  urlParams: Record<keyof T["endPointArgs"], string | number>
) => {
  return isFunction(endPoint) ? (endPoint as Function)(urlParams) : endPoint;
};

export const finalName = (
  name: axiosQueryObjectType["name"],
  queryParams?: CallBackArgsType["queryParams"],
  urlParams?: CallBackArgsType["urlParams"]
) =>
  isFunction(name)
    ? (name as Function)({
        ...queryParams,
        ...urlParams,
      })
    : name;

export const finalQueryParams = (
  queryParams: axiosQueryObjectType["queryParams"],
  argQueryParams: CallBackArgsType["queryParams"]
) => (isFunction(queryParams) ? (queryParams as Function)(argQueryParams) : queryParams);

export const defaultDto = (arrayData: Record<any, any>[] | Record<any, any>) => {
  if (isArray(arrayData)) {
    return arrayData.map((item) => {
      return {
        [camelCase(Object.keys(item)[0])]: Object.values(item)[0],
      };
    });
  } else {
    let object: Record<any, any> = {};
    Object.keys(arrayData).forEach((key) => {
      object[camelCase(key)] = arrayData[key];
    });
    return object;
  }
};
+