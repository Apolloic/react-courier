import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './_app'
import { CourierDevtools, CourierProvider } from 'react-courier'

declare module 'react-courier' {
  interface RegisterOtherBaseUrls {
    test: string
  }
  interface RegisterErrorDto {}
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CourierProvider
      otherBaseUrl={{
        test: 'fff',
      }}
      defaultOptions={{
        axiosAgentConfig: {
          withCredentials: true,
        },
      }}
      middleware={(response) => {
        console.log(response)
      }}
      defaultBaseUrl='https://jsonplaceholder.typicode.com/'
    >
      <App />
      <CourierDevtools />
    </CourierProvider>
  </React.StrictMode>,
)
