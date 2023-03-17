import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AxiosQueryProvider from "./lib/axiosQuery/Providers/AxiosQueryProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AxiosQueryProvider
      defaultBaseUrl="https://jsonplaceholder.typicode.com/"
      otherBaseUrl={{
        test: "sdasd",
      }}
    >
      <App />
    </AxiosQueryProvider>
  </React.StrictMode>
);
