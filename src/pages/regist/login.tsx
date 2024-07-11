import React, { useState } from 'react';
import Input from "../../components/shared/Input"
import Button from '../../components/shared/Button'
import AppBar from '../../components/shared/AppBar';
import Title from '../../components/shared/Title';

const Login: React.FC = () => {
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
        <div className="mt-auto mb-64">
          <Button
            variant="contained"
            fullWidth
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