import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  nickname: string;
  password: string;
  key: string;
}

const initialState: UserState = {
  email: "default_email",
  nickname: "default_nickname",
  password: "default_password",
  key: "default_key",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setNickname(state, action: PayloadAction<string>) {
      state.nickname = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setKey(state, action: PayloadAction<string>) {
      state.key = action.payload;
    },
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.password = action.payload.password;
      state.key = action.payload.key;
    },
    clearUser(state) {
      state.email = "";
      state.nickname = "";
      state.password = "";
      state.key = "";
    },
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// store의 타입 미리 export 해두기
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const {
  setEmail,
  setNickname,
  setPassword,
  setKey,
  setUser,
  clearUser,
} = userSlice.actions;
export default store;
