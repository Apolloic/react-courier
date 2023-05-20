import lodash from 'lodash'
import { DTONested } from '../types'

export function getFinalEndPoint<TUrlParams, TEndPoint>(endPoint: TEndPoint, urlParams?: TUrlParams): string {
  return urlParams
    ? lodash.isFunction(endPoint)
      ? endPoint(urlParams)
      : endPoint
    : lodash.isFunction(endPoint)
    ? endPoint()
    : endPoint
}

export const getFinalName = <TName, TQP, TUP>(name: TName, queryParams: TQP, urlParams: TUP) => {
  if (lodash.isFunction(name)) {
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
      if (lodash.isFunction(staticQueryParams)) {
        return { ...queryParamsFromHook, ...staticQueryParams(queryParamsFromHook) }
      } else {
        return { ...queryParamsFromHook, ...staticQueryParams }
      }
    } else {
      return queryParamsFromHook
    }
  } else {
    if (staticQueryParams) {
      return staticQueryParams
    } else {
      return {}
    }
  }
}

export const defaultDto = <Data>(data: Data): DTONested<Data> => {
  if (lodash.isArray(data)) {
    return lodash.map(data, defaultDto) as DTONested<Data>
  }

  if (lodash.isObject(data)) {
    const newObjKeys = lodash.mapKeys(data, (_value, key) => lodash.camelCase(key))
    const newObjValues = lodash.mapValues(newObjKeys, (value) => defaultDto(value))
    return newObjValues as DTONested<Data>
  }

  return data as DTONested<Data>
}
