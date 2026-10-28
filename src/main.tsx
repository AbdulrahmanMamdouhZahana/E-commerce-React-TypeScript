import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from "react-redux";
import { persiste, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import InternetConnectionProvider from "./Providers/InternetConnectionProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        const status = (error as { response?: { status?: number } })?.response?.status;
        if (status === 401 || status === 403 || status === 404) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});





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