import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css"

import {
  
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from "react-redux";
import { persiste, store } from "./app/store.js";
import { PersistGate } from "redux-persist/integration/react";
import InternetConnectionProvider from "./Providers/InternetConnectionProvider.js";

const queryClient = new QueryClient()




createRoot(document.getElementById("root")!).render(

<Provider store={store}>

  <PersistGate  persistor={persiste}>

    <QueryClientProvider client={queryClient}>
    <InternetConnectionProvider>
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
</InternetConnectionProvider>
      </QueryClientProvider>
      
        </PersistGate>
</Provider>
);