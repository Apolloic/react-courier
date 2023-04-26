import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import camelCase from 'lodash/camelCase'
import map from 'lodash/map'
import mapKeys from 'lodash/mapKeys'
import mapValues from 'lodash/mapValues'

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
    return isFunction(endPoint) ? (endPoint as FunctionType)(urlParams) : endPoint
  } else {
    return isFunction(endPoint) ? (endPoint as FunctionType)() : endPoint
  }
}

export const finalName = (
  name: CourierObjectType['name'],
  queryParams?: Record<any, any>,
  urlParams?: CallBackArgsType['urlParams'],
) => {
  if (isFunction(name)) {
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
      if (isFunction(staticQueryParams)) {
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
  if (isArray(data)) {
    return map(data, defaultDto) as DTONested<Data>
  }

  if (isObject(data)) {
    const newObjKeys = mapKeys(data, (_value, key) => camelCase(key))
    const newObjValues = mapValues(newObjKeys, (value) => defaultDto(value))
    return newObjValues as DTONested<Data>
  }

  return data as DTONested<Data>
}
