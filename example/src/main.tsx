import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/App'
import { AxiosQueryProvider } from 'rest-hook'

declare module 'rest-hook/types' {
  interface RegisterOtherBaseUrls {
    test: string
  }
  interface RegisterErrorDto {}
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AxiosQueryProvider
    otherBaseUrl={{
      test: 'salam',
    }}
    defaultOptions={{
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
  </AxiosQueryProvider>,
)
