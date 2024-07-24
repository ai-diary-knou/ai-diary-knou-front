import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { setVerificationCode, nextStep } from '../../../store/Slice/signupSlice';

import Input from "../../shared/Input";
import Button from '../../shared/Button';

import axios from 'axios';
import { USER_URL_PREFIX } from '../../../mocks/users/handlers';

const Verify: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const code = useSelector((state: RootState) => state.signup.verificationCode);
  const email = useSelector((state: RootState) => state.signup.email);
  
  const [isValidCode, setIsValidCode] = useState(true);
  const [timer, setTimer] = useState(300); // 5 minutes
  const [isExpired, setIsExpired] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setIsExpired(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const validateCode = (code: string) => {
    return /./.test(code); 
  };

  const handleCodeChange = (value: string) => {
    dispatch(setVerificationCode(value));
    setIsValidCode(validateCode(value));
    setErrorMessage('');
  };

  const handleNextStep = async (): Promise<void> => {
    if (isValidCode && code.trim() !== '') {
      try {
        const isCodeValid = await checkVerifyCode(email, code);
        if (isCodeValid.isValid) {
          dispatch(nextStep());
        } else {

          if(isCodeValid.code === 'AUTH_CODE_EXPIRED') {
            setErrorMessage('인증번호가 만료되었습니다.');
          }
          if(isCodeValid.code === 'EMAIL_AUTH_FAIL') {
            setErrorMessage('인증번호가 올바르지 않습니다.');
          }
        }
      } catch (error) {
        console.error('Error during verification:', error);
        //setErrorMessage('인증 과정에서 오류가 발생했습니다.');
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const checkVerifyCode = async (email: string, code: string): Promise<{ isValid: boolean; code: string }> => {
    try {
      const response = await axios.post(`${USER_URL_PREFIX}/email/auth`, { email, code });
      return { isValid: response.data.status === 'SUCCESS', code: response.data.code };
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }
  };

  return (
    <>
      <div className="mb-16">
        <Input
          fullWidth
          label="인증코드"
          variant="outlined"
          value={code}
          onChange={(e) => handleCodeChange(e)}
          error={!isValidCode || !!errorMessage}
          helperText={
            errorMessage || 
            (isExpired
              ? "인증번호가 만료되었습니다."
              : "이메일로 전송된 인증번호를 5분 이내에 입력해주세요.")
          }
          disabled={isExpired}
        />
        {!isExpired && (
          <div style={{ marginTop: '8px', marginLeft:'13px', fontSize: '0.75rem', color: '#666' }}>
            남은 시간: {formatTime(timer)}
          </div>
        )}
      </div>
      <div className="mt-auto mb-64">
        <Button
          variant="contained"
          fullWidth
          className="bg-blue-500 hover:bg-blue-600 py-3"
          onClick={handleNextStep}
          disabled={!isValidCode || code.trim() === '' || isExpired}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default Verify;