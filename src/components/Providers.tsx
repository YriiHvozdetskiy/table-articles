"use client";

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactNode} from "react";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from "@/store";

const queryClient = new QueryClient();

function Providers({children}: Readonly<{ children: ReactNode }>) {
   return (
      <QueryClientProvider client={queryClient}>
         <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
               {children}
            </PersistGate>
         </Provider>
      </QueryClientProvider>
   );
}

export default Providers;
