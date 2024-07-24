import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types';

const initialState: UserState = {
  email: '',
  nickname: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUserNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    clearUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUserEmail, setUserNickname, clearUser } = userSlice.actions;

export default userSlice.reducer;