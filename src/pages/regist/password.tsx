import React, { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import Input from "../../components/shared/Input"
import Button from '../../components/shared/Button'
import AppBar from '../../components/shared/AppBar';
import Title from '../../components/shared/Title';

import axios from 'axios';

import { USER_URL_PREFIX } from '../../mocks/users/handlers';

const Password: React.FC = () => {
  const navigate = useNavigate();

  const [email] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setrePassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const validatePassword = (password: string) => {
    // 최소 8자, 최대 20자, 최소 하나의 대문자, 소문자, 숫자, 특수문자 포함
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return re.test(password);
  };

  useEffect(() => {
    setIsValidPassword(validatePassword(password));
    setPasswordsMatch(password === rePassword);
  }, [password, rePassword]);

  const handlePasswordChange1 = (value: string) => {
    setPassword(value);
  };

  const handlePasswordChange2 = (value: string) => {
    setrePassword(value);
  };

  const regist = (): void => {
    console.log("checkVerifyCode");
    axios
      .post(USER_URL_PREFIX, {
          email: email,
          passowrd: password,
          rePassword: rePassword,
      })
      .then((response) => {
        // 서버응답 처리
        console.log(response.status);
        navigate("/completeRegist");
      })
      .catch((error) => {
        console.error('There was an error!', error);
      })
  }

  return (
    <div className="mx-auto bg-white flex flex-col h-screen">
      <AppBar/>
      <Title title="회원가입" />
      <div className="flex-grow flex flex-col justify-center px-6">
        <div className="mb-4">
          <Input
            fullWidth
            label="비밀번호"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange1}
            error={!isValidPassword && password !== ''}
            helperText={!isValidPassword && password !== '' ? "비밀번호는 8-20자의 대소문자, 숫자, 특수문자를 포함해야 합니다." : ""}
            secureTextEntry
          />
        </div>
        <div className="mb-4">
          <Input
            fullWidth
            label="비밀번호 확인"
            variant="outlined"
            value={rePassword}
            onChange={handlePasswordChange2}
            error={!passwordsMatch && rePassword !== ''}
            helperText={!passwordsMatch && rePassword !== '' ? "비밀번호가 일치하지 않습니다." : ""}
            secureTextEntry
          />
        </div>
        <div className="mt-auto mb-64">
          <Button
            variant="contained"
            fullWidth
            onClick={regist}
            disabled={!isValidPassword || !passwordsMatch || password.trim() === '' || rePassword.trim() === ''}
            className="bg-blue-500 hover:bg-blue-600 py-3"
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Password;