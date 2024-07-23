import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { TextField } from '@mui/material';
import { AppDispatch, RootState} from '../../store/store';
import {nextStep, setVerificationCode} from '../../store/signupSlice';
import Button from '../shared/Button';
import { USER_URL_PREFIX } from '../../mocks/users/handlers';
import axios from 'axios';

const Verify: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const code = useSelector((state: RootState) => state.signup.verificationCode);
  const email = useSelector((state: RootState) => state.signup.email);

  // timer
  const [isValidCode, setIsValidCode] = useState(true);
  const [timer, setTimer] = useState(180);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timer > 0 && !isExpired) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsExpired(true);
    }
  }, [timer, isExpired]);

  const validateCode = (code: string) => {
    const re = /./;
    return re.test(code);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setVerificationCode(value));
    setIsValidCode(value.trim() === '' || validateCode(value));
  };

  const handleNextStep = async (): Promise<void> => {
    if (isValidCode && code.trim() !== '') {
      const isCodeValid = await checkVerifyCode(email, code);
      if (isCodeValid) {
        dispatch(nextStep());
      } else {
        console.log('인증번호가 일치하지 않습니다.');
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const checkVerifyCode = async (value1: string, value2: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${USER_URL_PREFIX}/email/auth`, {
        email: value1,
        code: value2,
      });
      console.log(response.data);
      return true;
    } catch (error) {
      console.error('There was an error!', error);
      return false;
    }
  };

  return (
    <>
      <div className="mb-16">
        <TextField
          fullWidth
          label="인증코드"
          variant="outlined"
          value={code}
          onChange={handleCodeChange}
          error={!isValidCode}
          size='small'
          helperText={
            !isValidCode 
              ? "인증번호를 확인해주세요." 
              : isExpired 
                ? "인증번호가 만료되었습니다." 
                : "이메일로 전송된 인증번호를 5분 이내에 입력해주세요."
          }
          disabled={isExpired}
        />
        {!isExpired && (
          <div style={{ marginTop: '1px', marginLeft:'13px', fontSize: '0.75rem', }}>
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
        disabled={!isValidCode || code.trim() === ''}
      >
        다음
      </Button>
    </div>
  </>
  );
};

export default Verify;
