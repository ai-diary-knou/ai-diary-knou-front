import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import router from "./router.tsx";

import { RouterProvider } from "react-router-dom";
import ReactQueryProvider from "./providers/ReactQueryProvider.tsx";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import ReduxProvider from "./providers/ReduxProvider.tsx";
import ToastProvider from "./providers/ToastProvider.tsx";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ReactQueryProvider>
        <ThemeProvider>
          <ReduxProvider>
            <RouterProvider router={router} />
            <ToastProvider />
          </ReduxProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </React.StrictMode>
  );
});
