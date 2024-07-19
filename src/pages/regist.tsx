import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import AppBar from '../components/shared/AppBar';
import Title from '../components/shared/Title';
import Button from '../components/shared/Button';

import Email from './regist/email';
import Verify from './regist/verify';
import Nickname from './regist/nickname';
import Password from './regist/password';
import CompleteRegist from './regist/completeRegist';

import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../store/store';

import axios from 'axios';
import { USER_URL_PREFIX } from '../mocks/users/handlers';


const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const steps = ['email', 'verify', 'nickname', 'password', 'completeRegist'] as const;
type Step = typeof steps[number];

const stepComponents: Record<Step, React.FC> = {
  email: Email,
  verify: Verify,
  nickname: Nickname,
  password: Password,
  completeRegist: CompleteRegist,
};

const Regist: React.FC = () => {
  // first step
  const [step, setStep] = useState<Step>('email');
  const navigate = useNavigate();

  const email = useTypedSelector((state) => state.user.email);
  const code = useTypedSelector((state) => state.user.code);
  const nickname = useTypedSelector((state) => state.user.nickname);

  // 이메일 중복체크
  const checkEmail = (value : string): boolean => {
    axios
      .get(USER_URL_PREFIX + "/duplicate", {
        params: {
          type: "email",
          value: value,
        },
      })
      .then((response) => {
        // 서버응답 처리
        console.log(response.status);
        return true;
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
      
      return false;
  }
  

  // 인증번호 전송
  const sendVerifyCode = (): void => {
    console.log(email);
    axios
      .post(USER_URL_PREFIX + "/email/auth-code", {
          email: email,
      })
      .then((response) => {
        // 서버응답 처리
        console.log("sendVerifyCode: " + response.status);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      })
  }

  // 인증번호 체크
  const checkVerifyCode = (value1 : string, value2 : string): void => {
    console.log("checkVerifyCode");
    axios
      .post(USER_URL_PREFIX + "/email/auth", {
          email: value1,
          code: value2,
      })
      .then((response) => {
        console.log(response.status);
        navigate("/nickname");
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };




  const handleNextStep = useCallback(() => {
    const currentIndex = steps.indexOf(step);
    console.log(email);

    // Email button
    if(step === 'email') {
      checkEmail(email) ? sendVerifyCode() : console.log("중복된 이메일");
    }

    // Verify button
    if(step === 'verify') {
      checkVerifyCode(email, "1234");
    }

    // Nickname button
    if(step === 'nickname') {
      console.log(nickname);
    }

    // Password button
    if(step === 'password') {
      console.log("password");
    }

    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    } else {
      navigate("/login");
    }
  }, [step, email, navigate]);

  const StepComponent = stepComponents[step];

  return (
    <div className="mx-auto bg-white flex flex-col h-screen">
      <AppBar />
      <Title title="회원가입" />
      <div className="flex-grow flex flex-col justify-center px-6">
        <StepComponent />
        <div className="mt-auto mb-64">
          <Button
            variant="contained"
            fullWidth
            className="bg-blue-500 hover:bg-blue-600 py-3"
            onClick={handleNextStep}
          >
            {step === 'completeRegist' ? '로그인' : '다음'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Regist;