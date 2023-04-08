import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/App'
import { CourierProvider } from 'react-courier'

declare module 'react-courier/types' {
  interface RegisterOtherBaseUrls {
    test: string
  }
  interface RegisterErrorDto {}
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CourierProvider
    otherBaseUrl={{
      test: 'salam',
    }}
    defaultOptions={{
      axiosAgentConfig: {},
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: false,
      },
    }}
    middleware={(response) => {
      console.log(response)
    }}
    defaultBaseUrl='https://jsonplaceholder.typicode.com/'
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CourierProvider>,
)
