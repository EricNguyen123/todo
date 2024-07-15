import React from 'react'
import ReactDOM from 'react-dom/client'
import AppWrapper from './App.tsx'
import './index.css'
import './utils/froala.ts'
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import "./translations/i18n.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
