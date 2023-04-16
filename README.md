
# React-courier

This package made your requests much easier by using Tanstack-query and Axios inside.
#

## Installation

Install react-courier with npm

```bash
  npm install react-courier
```
or Install react-courier with yarn  
```bash
  yarn add react-courier
```

## Usage/Examples
At first, we should use a provider for our global config on the entire project.

## CourierProvider
```javascript
import { CourierProvider } from 'react-courier'

function App() {
  return (
    <CourierProvider defaultBaseUrl={API_BASE_URL}>
      <Component />
    </CourierProvider>
  )
}
```


#### CourierProvider Props
Our CourierProvider takes some props for better usage and your custom config.

| props | type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `defaultBaseUrl`      | `string` | default base URL for your request * |
| `otherBaseUrl`      | `object` | key values for others baseUrls in case you need |
| `defaultOptions`      | `object` | global config for requests, that takes an object with different properties that you can see [here]() |
| `middleware`      | `function` | before running DTO on the requests this callback runs |

#### defaultOptions properties 

- `axiosAgentConfig`: all the axios defaults configs except headers timeout and baseUrls, for more explanation check out [here](https://axios-http.com/docs/config_defaults)
- `errorDto`: This function gets the request errors and customize it all over the project by using react-courier.
- `headers`: Headers are key-value pairs that provide metadata about the request being made. They can include information such as the content type of the `request`, `authentication` `credentials`, and more. here  you can wrtie all of the common headers.

- `mutations`: All the configs exist in the tanstack-query defaultOption for the mutations hooks part can be used in this object.
- `queries`:  All the configs exist in the tanstack-query defaultOption for the query hooks part can be used in this object. for more info take a look at tanstack documantation [here](https://tanstack.com/query/v4/docs/react/guides/queries)
- `timeout`: Timeouts can be set in Axios using the timeout configuration option. This option specifies the number of seconds before the request times out. 

## CreateApi

CreateApi is a function for making requests inside components. 

#### Explanation:
for making requests inside components. we should use the CreateApi function that takes one argument as an object and return a React-Hooks. for a different request method that we give inside CreateApi parameters, the react-hook could be useMutation or useQuery from 
Tanstack-query.

#### Code Example:

```javascript
import { CreateApi } from 'react-courier'

const useGETPosts = CreateApi({
  endPoint: () => `/YOUR_END_POINT`,
  name: () => ['YOUR_REQUEST_NAME'],
  method: 'GET',
})

function Component() {
  const {data,isLoading,isError,error} = useGETPosts()
  if(isError) return <p>{error.message}</p>
  if(isLoading) return <p>Loading...</p>
  return <OtherComponent data={data} />
}
```

#### CreateApi parameter object properties:

-  `endPoint`:  EndPoitn of your request that is a string or function if the URL includes a dynamic parameter.
-  `name`:The name of your request that gives the ability for caching your request. This property can be an array or a function that gets dynamicEndpoint values and dynamic queryParameters as argument. (for dynamic caching discussion) and it returns an array.
-  `method`: All of the rest api Methods: `GET`, `POST`, `PUT`, `DELETE`,`PATCH`.
-  `queryParams`: ... 
-  `requestData`: ...
-  `dto`: ... 
-  `axiosAgentConfig`: ... 
 - `baseUrl`: the key of otherBaseUrl config in `courierProvider`. as a default it sets to defaultBaseUrl in courierProvider.
-  `headers`:  Headers are key-value pairs that provide metadata about the request being made. They can include information such as the content type of the `request`, `authentication` `credentials`, and more. here  you can wrtie all of the specific request headers.
-  `options`: ...
-  `timeout`: Timeouts can be set in Axios using the timeout configuration option. This option specifies the number of seconds before the request times out. and its only for this request.
