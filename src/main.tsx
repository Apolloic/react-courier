import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AxiosQueryProvider from "./lib/axiosQuery/Providers/AxiosQueryProvider";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <AxiosQueryProvider
      defaultBaseUrl="http://localhost:3000"
      defaultOptions={{
        queries: {
          refetchOnMount: false,
          refetchOnReconnect: true,
          refetchOnWindowFocus: false,
        },
      }}
      otherBaseUrl={{
        test: "erfan",
      }}
    >
      <App />
    </AxiosQueryProvider>
  </React.StrictMode>
);
