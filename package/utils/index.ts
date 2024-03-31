import { DTONested } from '../types'
import camelCase from "camelcase"

export function getFinalEndPoint<TUrlParams, TEndPoint extends CallableFunction | string>(endPoint: TEndPoint, urlParams?: TUrlParams): string {
  if (typeof endPoint === "function") {
    return endPoint(urlParams)
  }

  return endPoint
}

export const getFinalName = <TName, TQP, TUP>(name: TName, queryParams: TQP, urlParams: TUP) => {
  if (typeof name === "function") {
    return name({
      ...queryParams,
      ...urlParams,
    })
  } else {
    return name
  }
}

export const getFinalQueryParams = <TSQP, TDQP>(staticQueryParams: TSQP, queryParamsFromHook: TDQP) => {
  if (queryParamsFromHook) {
    if (staticQueryParams) {
      return {
        ...queryParamsFromHook,
        ...(typeof staticQueryParams === "function"
          ? staticQueryParams(queryParamsFromHook)
          : staticQueryParams)
      }
    } else {
      return queryParamsFromHook
    }
  } else {
    return staticQueryParams || {}
  }
}

export const defaultDto = <Data>(data: Data): DTONested<Data> => {
  if (Array.isArray(data)) {
    return data.map((entry) => defaultDto(entry)) as DTONested<Data>
  }

  if (data && typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) =>
        [camelCase(key), defaultDto(value)]
      )
    ) as DTONested<Data>
  }

  return data as DTONested<Data>
}
