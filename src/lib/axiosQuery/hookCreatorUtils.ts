import { camelCase, forEach, isArray, isFunction } from "lodash";
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

export const defaultDto = (arrayData: Record<any, any>[] | Record<any, any> | any) => {
  const obj: any = {}
  if (isArray(arrayData)) {
    arrayData.forEach((item) => {
      for (const key in item) {
        obj[camelCase(key)] = item[key]
      }
    });
    return [obj]
  } else {
    let object: Record<any, any> = {};
    Object.keys(arrayData).forEach((key) => {
      object[camelCase(key)] = arrayData[key];
    });
    return object;
  }
};