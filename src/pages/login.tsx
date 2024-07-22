import React, { useState } from 'react';

import Input from "../components/shared/Input"
import Button from '../components/shared/Button'
import AppBar from '../components/shared/AppBar';
import Title from '../components/shared/Title';

import axios from 'axios';

import { USER_URL_PREFIX } from '../mocks/users/handlers';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch, setIniterlize } from '../store/store';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const login = (): void => {
    axios
      .post(USER_URL_PREFIX + "/login", {
          email: email,
          password: password,
      })
      .then(async (response) => {
        // 서버응답 처리
        console.log(response.status);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      })
  }

  const handleClick = () => {
    // 필요한 상태 초기화
    dispatch(setIniterlize());
    navigate('/forgotPassword');
  };

  return (
    <div className="mx-auto bg-white flex flex-col h-screen">
      <AppBar/>
      <Title title="로그인" />
      <div className="flex-grow flex flex-col justify-center px-6">
        <div className="mb-4">
          <Input
            fullWidth
            label="이메일"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            error={!isValidEmail && email !== ''}
            helperText={!isValidEmail && email !== '' ? "유효한 이메일 주소를 입력해주세요." : ""}
          />
        </div>
        <div className="mb-4">
          <Input
            fullWidth
            label="비밀번호"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            type="password"
          />
        </div>
        <div className="mb-4 text-right">
          <button onClick={handleClick} className="text-sm bg-transparent border-none cursor-pointer text-blue-600 hover:text-blue-800">
            비밀번호 찾기
          </button>
        </div>
        <div className="mt-auto mb-64">
          <Button
            variant="contained"
            fullWidth
            onClick={login}
            disabled={!isValidEmail || email.trim() === '' || password.trim() === ''}
            className="bg-blue-500 hover:bg-blue-600 py-3"
          >
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;