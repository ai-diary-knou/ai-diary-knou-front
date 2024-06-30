import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ReactQueryProvider from "./providers/ReactQueryProvider.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";

import { Provider } from "react-redux";
import store from "./store/store.ts";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ReactQueryProvider>
  </React.StrictMode>
);
