import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

import Input from "../../components/shared/Input";

import { AppDispatch, setEmail } from '../../store/store';

import { useSelector } from 'react-redux'
import { RootState } from '../../store/store';

const Regist: React.FC = () => {
  const email = useSelector((state: RootState) => state.user.email);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const handleEmailChange = (value: string) => {
    dispatch(setEmail(value));

    if (value.trim() !== '') {
      setIsValidEmail(validateEmail(value));
    } else {
      setIsValidEmail(true);
    }
  };

  return (
    <div className="mb-16">
      <Input
        fullWidth
        label="이메일"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
        error={!isValidEmail}
        helperText={!isValidEmail ? "올바른 이메일 형식이 아닙니다." : "가입하실 이메일을 입력해주세요."}
      />
    </div>
  );
};

export default Regist;
