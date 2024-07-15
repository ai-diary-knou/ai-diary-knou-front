import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Button from '../../components/shared/Button';
import AppBar from '../../components/shared/AppBar';
import Title from '../../components/shared/Title';

import axios from 'axios';

import { USER_URL_PREFIX } from '../../mocks/users/handlers';

const Verify: React.FC = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [email] = useState('');
  const [isValidCode, setIsValidCode] = useState(true);
  const [timer, setTimer] = useState(5);
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
    const re = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    return re.test(code);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCode(value);
    if (value.trim() !== '') {
      setIsValidCode(validateCode(value));
    } else {
      setIsValidCode(true);
    }
  };

  const chkVerifyCode = (): void => {
    console.log("checkVerifyCode");
    axios
      .post(USER_URL_PREFIX + "/email/auth", {
          email: email,
          code: code,
      })
      .then((response) => {
        console.log(response.status);
        navigate("/password");
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="mx-auto bg-white flex flex-col h-screen">
      <AppBar />
      <Title title="회원가입" />
      <div className="flex-grow flex flex-col justify-center px-6">
        <div className="mb-16">
          <TextField
            fullWidth
            label="인증코드"
            variant="outlined"
            value={code}
            onChange={handleCodeChange}
            error={!isValidCode}
            helperText={
              !isValidCode 
                ? "인증번호를 확인해주세요." 
                : isExpired 
                  ? "인증번호가 만료되었습니다." 
                  : "이메일로 전송된 인증번호를 5분 이내에 입력해주세요."
            }
            disabled={isExpired}
            InputProps={{
              endAdornment: !isExpired && (
                <InputAdornment position="end">
                  {formatTime(timer)}
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="mt-auto mb-64">
          <Button
            variant="contained"
            fullWidth
            disabled={!isValidCode || code.trim() === '' || isExpired}
            className="bg-blue-500 hover:bg-blue-600 py-3"
            onClick={chkVerifyCode}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
