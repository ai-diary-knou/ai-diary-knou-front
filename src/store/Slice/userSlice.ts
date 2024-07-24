import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types";

const initialState: UserState = {
  email: "",
  nickname: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
    },
    logout: (state) => {
      state.email = "";
      state.nickname = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
