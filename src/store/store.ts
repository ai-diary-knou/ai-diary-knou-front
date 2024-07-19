import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  nickname: string;
  code: string;
  key: string;
}

const initialState: UserState = {
  email: "",
  nickname: "",
  code: "",
  key: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
      //localStorage.setItem('email', action.payload);
    },
    setNickname(state, action: PayloadAction<string>) {
      state.nickname = action.payload;
    },
    setCode(state, action: PayloadAction<string>) {
      state.code = action.payload;
    },
    setKey(state, action: PayloadAction<string>) {
      state.key = action.payload;
    },
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.code = action.payload.code;
      state.key = action.payload.key;
    },
    clearUser(state) {
      state.email = "";
      state.nickname = "";
      state.code = "";
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
  setCode,
  setKey,
  setUser,
  clearUser,
} = userSlice.actions;
export default store;