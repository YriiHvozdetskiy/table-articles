import {configureStore} from '@reduxjs/toolkit';
import {
   persistStore,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';
import {themeReducer} from '@/store/theme/themeSlice';

const store = configureStore({
   reducer: {
      theme: themeReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER],
         },
      }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
