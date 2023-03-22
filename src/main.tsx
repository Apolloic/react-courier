import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AxiosQueryProvider} from "./lib/axiosQuery";

declare module "./lib/axiosQuery" {
  interface RegisterErrorDto {}
  interface RegisterOtherBaseUrls {}
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AxiosQueryProvider
      defaultBaseUrl="https://jsonplaceholder.typicode.com/"
      defaultOptions={{
        errorDto: (error) => {
          return {
            isSucess: false,
            message: error.message,
          };
        },
        queries: {
          refetchOnMount: false,
          refetchOnReconnect: true,
          refetchOnWindowFocus: false,
          onError: (error) => {
            console.log(error);
          },
        },
        mutations: {
          onError(error, variables, context) {},
        },
      }}
      otherBaseUrl={{
        test: "salam",
        test2: "mamad",
      }}
    >
      <App />
      <ToastContainer />
    </AxiosQueryProvider>
  </React.StrictMode>
);
