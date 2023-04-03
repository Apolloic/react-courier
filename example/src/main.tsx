import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RestHookProvider } from 'rest-hook'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RestHookProvider defaultBaseUrl=''>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RestHookProvider>,
)
