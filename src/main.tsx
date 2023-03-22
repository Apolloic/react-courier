import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AxiosQueryProvider from "./lib/axiosQuery/Providers/AxiosQueryProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



declare module "./lib/axiosQuery" {
  type RegisterErrorDto = {
    isSucess: false,
    message: string
  }
  type RegisterDto = {

  }
  type RegisterOtherBaseUrlsKeys = ["test"]
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AxiosQueryProvider
      defaultBaseUrl="https://jsonplaceholder.typicode.com/"
      defaultOptions={{
        errorDto: (error) => {
          return {
            isSucess: false,
            message: error.message
          }
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
          onError(error, variables, context) {

          },
        }
      }}
      otherBaseUrl={{
        test: 'erfan'
      }}
    >
      <App />
      <ToastContainer />
    </AxiosQueryProvider>
  </React.StrictMode>
);
