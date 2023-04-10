import _ from 'lodash'

import {
  CallBackArgsType,
  CreateCourierEntranceType,
  DTONested,
  EndPointFunction,
  FunctionType,
  CourierObjectType,
} from '../types'

export const getFinalEndPoint = <T extends CreateCourierEntranceType>(
  endPoint: string | EndPointFunction<T['endPointArgs']>,
  urlParams?: Record<keyof T['endPointArgs'], string | number>,
) => {
  if (urlParams) {
    return _.isFunction(endPoint) ? (endPoint as FunctionType)(urlParams) : endPoint
  } else {
    return _.isFunction(endPoint) ? (endPoint as FunctionType)() : endPoint
  }
}

export const finalName = (
  name: CourierObjectType['name'],
  queryParams?: Record<any, any>,
  urlParams?: CallBackArgsType['urlParams'],
) => {
  if (_.isFunction(name)) {
    return (name as FunctionType)({
      ...queryParams,
      ...urlParams,
    })
  } else {
    return name
  }
}

export const finalQueryParams = (
  staticQueryParams: Record<any, any> | FunctionType,
  dynamicQueryParams: Record<any, any>,
) => {
  if (dynamicQueryParams) {
    if (staticQueryParams) {
      if (_.isFunction(staticQueryParams)) {
        return { ...dynamicQueryParams, ...(staticQueryParams as FunctionType)(dynamicQueryParams) }
      } else {
        return { ...dynamicQueryParams, ...staticQueryParams }
      }
    } else {
      return dynamicQueryParams
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
  if (_.isArray(data)) {
    return _.map(data, defaultDto) as DTONested<Data>
  }

  if (_.isObject(data)) {
    return _(data)
      .mapKeys((_v, k) => _.camelCase(k))
      .mapValues((v) => defaultDto(v))
      .value() as DTONested<Data>
  }

  return data as DTONested<Data>
}
