import { configureStore, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface SignupState {
  email: string;
  verificationCode: string;
  nickname: string;
  password: string;
  rePassword: string;
  currentStep: number;
}

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
    setIniterlize: (state) => {
      state.email = '';
      state.verificationCode = '';
      state.nickname = '';
      state.password = '';
      state.rePassword = '';
      state.currentStep = 1;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
  },
});

let store = configureStore({
  reducer: {
    signup: signupSlice.reducer
  }
})

// store의 타입 미리 export 해두기
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const { setEmail, setVerificationCode, setNickname, setPassword, setRePassword, setIniterlize, nextStep, prevStep } = signupSlice.actions;
export default store;