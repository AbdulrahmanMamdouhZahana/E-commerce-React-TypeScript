
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

import storageModule from 'redux-persist/lib/storage'
import type { Storage } from 'redux-persist'
import internetConnection  from './features/internetConnection'

interface StorageModule extends Partial<Storage> {
  default?: Storage;
}

const storage: Storage =
  typeof (storageModule as StorageModule).getItem === 'function'
    ? (storageModule as Storage)
    : ((storageModule as StorageModule).default ?? (storageModule as Storage))

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
