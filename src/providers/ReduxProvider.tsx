import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "../store/store";

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: ReduxProviderProps) => {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
  );
};

export default ReactQueryProvider;
