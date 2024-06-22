import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ReactQueryProvider from "./providers/ReactQueryProvider.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
  </React.StrictMode>
);
