import { configureStore, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

interface UserState {
  email: string;
  nickname: string;
  key: string;
}

const initialState: UserState = {
  email: 'default_email',
  nickname: 'default_nickname',
  key: 'default_key',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setNickname(state, action: PayloadAction<string>) {
      state.nickname = action.payload
    },
    setKey(state, action: PayloadAction<string>) {
      state.key = action.payload
    },
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email
      state.nickname = action.payload.nickname
      state.key = action.payload.key
    },
    clearUser(state) {
      state.email = ''
      state.nickname = ''
      state.key = ''
    },
  },
})

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: userSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

let persistor = persistStore(store)

// store의 타입 미리 export 해두기
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const { setEmail, setNickname, setKey, setUser, clearUser } = userSlice.actions
export { store, persistor }
export default store