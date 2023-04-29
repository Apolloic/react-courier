import lodash from 'lodash'

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
    return lodash.isFunction(endPoint) ? (endPoint as FunctionType)(urlParams) : endPoint
  } else {
    return lodash.isFunction(endPoint) ? (endPoint as FunctionType)() : endPoint
  }
}

export const finalName = (
  name: CourierObjectType['name'],
  queryParams?: Record<any, any>,
  urlParams?: CallBackArgsType['urlParams'],
) => {
  if (lodash.isFunction(name)) {
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
      if (lodash.isFunction(staticQueryParams)) {
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
