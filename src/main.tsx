import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AxiosQueryProvider from "./lib/axiosQuery/Providers/AxiosQueryProvider";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AxiosQueryProvider
      defaultBaseUrl="https://jsonplaceholder.typicode.com/"
      defaultOptions={{
        queries: {
          refetchOnMount: false,
          refetchOnReconnect: true,
          refetchOnWindowFocus: false,
          onError: (error) => {
            console.log(error);
          },
        },
      }}
      otherBaseUrl={{
        test: "erfan",
      }}
    >
      <App />
      <ToastContainer />
    </AxiosQueryProvider>
  </React.StrictMode>
);
