import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

export type Theme = 'light' | 'dark';

export interface ThemeState {
   theme: Theme;
}

const initialState: ThemeState = {
   theme: 'dark',
};

const themeSlice = createSlice({
   name: 'theme',
   initialState,
   reducers: {
      setTheme(state, action: PayloadAction<Theme>) {
         state.theme = action.payload;
      },
   },
});

const themePersistConfig = {
   key: 'theme',
   storage,
   whitelist: ['theme'],
};

export const themeReducer = persistReducer<ThemeState>(
   themePersistConfig,
   themeSlice.reducer
);
export const {setTheme} = themeSlice.actions;
