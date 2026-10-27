
import { configureStore } from '@reduxjs/toolkit'

import loginApi from './features/LoginApi'
import cartSlice from './features/cartSlice'
import cartDrawre from './features/cartDrawerSlice'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import internetConnection  from './features/internetConnection'

const persistConfig = {
  key: 'cart',
  storage,
}

const persistedCartReducer = persistReducer(
  persistConfig,
  cartSlice
)

export const store = configureStore({
  reducer: {
     internet:internetConnection , 
    login: loginApi,
    cart: persistedCartReducer,
    drawer: cartDrawre,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
})

export const persiste = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
