import React, { useState } from 'react';

import Input from "../components/shared/Input"
import Button from '../components/shared/Button'
import AppBar from '../components/shared/AppBar';
import Title from '../components/shared/Title';

const Regist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    // 입력값이 비어있지 않을 때만 유효성 검사를 수행
    if (value.trim() !== '') {
      setIsValidEmail(validateEmail(value));
    } else {
      // 입력값이 비어있으면 유효성 상태를 true로 설정
      setIsValidEmail(true);
    }
  };

  return (
    <div className="mx-auto bg-white flex flex-col h-screen">
      <AppBar/>
      <Title title="회원가입" />      
      <div className="flex-grow flex flex-col justify-center px-6">
        <div className="mb-16">
          <Input
            fullWidth
            label="이메일"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            error={!isValidEmail}
            helperText={!isValidEmail ? "올바른 이메일 형식이 아닙니다." : ""}
          />
        </div>
        
        <div className="mt-auto mb-64">
          <Button
            variant="contained"
            fullWidth
            disabled={!isValidEmail || email.trim() === ''}
            className="bg-blue-500 hover:bg-blue-600 py-3"
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Regist;