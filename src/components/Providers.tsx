'use client';

import {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {
   isServer,
   QueryClient,
   QueryClientProvider,
} from '@tanstack/react-query';

import store, {persistor} from '@/store';

function makeQueryClient() {
   return new QueryClient();
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
   if (isServer) {
      return makeQueryClient();
   } else {
      if (!browserQueryClient) browserQueryClient = makeQueryClient();
      return browserQueryClient;
   }
}

function Providers({children}: Readonly<{ children: ReactNode }>) {
   const queryClient = getQueryClient();

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
