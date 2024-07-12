import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ReactQueryProvider from "./providers/ReactQueryProvider.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";

import { Provider } from "react-redux";
import store from "./store/store.ts";
import ThemeProvider from "./providers/ThemeProvider.tsx";

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
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
      </ThemeProvider>
      </ReactQueryProvider>
    </React.StrictMode>
  );
});