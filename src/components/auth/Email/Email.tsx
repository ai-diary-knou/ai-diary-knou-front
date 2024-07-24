import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { setEmail, nextStep } from '../../../store/Slice/signupSlice';

import Input from "../../shared/Input";
import Button from '../../shared/Button';
import { showToast } from '../../shared/Toast';

import axios from 'axios';
import { USER_URL_PREFIX } from '../../../mocks/users/handlers';

const Email: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.signup.email);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [helperMessage, setHelperMessage] = useState("이메일을 입력해주세요.");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  // async function
  const checkEmail = async (value: string): Promise<{ isValid: boolean; code: string }> => {

    // 잦은 API 요청을 방지하기 위한 1차 검증
    if (!value.trim() || !validateEmail(value)) {
      return { isValid: false, code: "INVALID_PARAMETER" };
    }
    
    try {
      const response = await axios.get(`${USER_URL_PREFIX}/duplicate`, {
        params: {
          type: "email",
          value: value,
        },
      });
      console.log(response.data);
      return { isValid: response.data.status === 'SUCCESS', code: response.data.code };
    } catch (error) {
      console.error(error);
      return { isValid: false, code: "ERROR" };
    }
  };

  const sendVerificationCode = async (value: string): Promise<void> => {
    try {
      const response = await axios.post(`${USER_URL_PREFIX}/email/auth-code`, {
        email: value,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleEmailChange = (value: string): void => {
    dispatch(setEmail(value));
    if (value.trim() === '') {
      setIsValidEmail(true);
    }
  };

  const handleNextStep = async (): Promise<void> => {
    if (isValidEmail && email.trim() !== '') {
      setIsLoading(true);
      try {
        await sendVerificationCode(email);
        dispatch(nextStep());
      } catch (error) {
        console.error(error);
        showToast({
          message: "인증코드 발송 중 에러가 발생했습니다.",
          type: "error",
          position: "top-center",
          autoClose: 3000
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const validateEmailInput = async () => {
      if (email.trim() !== '') {
        setIsCheckingEmail(true);

        // start checking email 
        const { isValid, code } = await checkEmail(email);
        setIsValidEmail(isValid);

        switch (code) {
          case "INVALID_PARAMETER":
            setHelperMessage("올바른 이메일 형식이 아닙니다.");
            break;
          case "USER_ALREADY_REGISTERED":
            setHelperMessage("이미 가입된 이메일입니다.");
            break;
          case "ERROR":
            // alert("서버와 통신 중 오류가 발생했습니다.");
            showToast({
              message: "이메일 중복 확인 중 오류가 발생했습니다.",
              type: "error",
              position: "top-center",
              autoClose: 3000
            });
            break;
          default:
            setHelperMessage("");
            break;
        }
        
        // finish checking email
        setIsCheckingEmail(false);
      } else {
        setIsValidEmail(true);
        setHelperMessage("가입하실 이메일을 입력해주세요.");
      }
    };

    validateEmailInput();
  }, [email]);

  return (
    <>
      <div className="mb-16">
        <Input
          fullWidth
          label="이메일"
          variant="outlined"
          value={email}
          onChange={(e) => handleEmailChange(e)}
          error={!isValidEmail}
          helperText={helperMessage}
          disabled={isLoading}
        />
      </div>
      <div className="mt-auto mb-64">
        <Button
          variant="contained"
          fullWidth
          className="bg-blue-500 hover:bg-blue-600 py-3"
          onClick={handleNextStep}
          disabled={!isValidEmail || email.trim() === '' || isLoading || isCheckingEmail}
        >
          {isLoading ? "처리 중..." : "다음"}
        </Button>
      </div>
    </>
  );
};

export default Email;