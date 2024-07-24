import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './Slice/signupSlice';
import userReducer from './Slice/userSlice';

const store = configureStore({
  reducer: {
    signup: signupReducer,
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;