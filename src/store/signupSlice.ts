import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignupState } from './types';

const initialState: SignupState = {
  email: '',
  verificationCode: '',
  nickname: '',
  password: '',
  rePassword: '',
  currentStep: 1,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setVerificationCode: (state, action: PayloadAction<string>) => {
      state.verificationCode = action.payload;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setRePassword: (state, action: PayloadAction<string>) => {
      state.rePassword = action.payload;
    },
    setInitialize: (state) => {
      Object.assign(state, initialState);
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
  },
});

export const {
  setEmail,
  setVerificationCode,
  setNickname,
  setPassword,
  setRePassword,
  setInitialize,
  nextStep,
  prevStep
} = signupSlice.actions;

export default signupSlice.reducer;