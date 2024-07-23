export interface SignupState {
    email: string;
    verificationCode: string;
    nickname: string;
    password: string;
    rePassword: string;
    currentStep: number;
  }
  
export interface UserState {
    email: string;
    nickname: string;
}