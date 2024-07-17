import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

import Input from "../../components/shared/Input";
import Button from '../../components/shared/Button';
import AppBar from '../../components/shared/AppBar';
import Title from '../../components/shared/Title';

import axios from 'axios';

import { USER_URL_PREFIX } from '../../mocks/users/handlers';
import { AppDispatch, setEmail } from '../../store/store';

const Regist: React.FC = () => {
  const navigate = useNavigate();
  
  const [email, set_Email] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const handleEmailChange = (value: string) => {
    set_Email(value);
    if (value.trim() !== '') {
      setIsValidEmail(validateEmail(value));
    } else {
      setIsValidEmail(true);
    }
  };

  const sendVerifyCode = (): void => {
    console.log("sendVerifyCode");
    axios
      .post(USER_URL_PREFIX + "/email/auth-code", {
          email: email,
      })
      .then((response) => {
        // 서버응답 처리
        console.log(response.status);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      })
  }
  

  const goNext = (): void => {
    console.log(email);
    if (email.trim() !== '') {

    axios
      .get(USER_URL_PREFIX + "/duplicate", {
        params: {
          type: "email",
          value: email,
        },
      })
      .then((response) => {
        // 서버응답 처리
        console.log(response.data);
        if(response.data.status === "SUCCESS") {
          dispatch(setEmail(email));
          sendVerifyCode();
          navigate("/verify");
        }else{
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    }
  }

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
            helperText={!isValidEmail ? "올바른 이메일 형식이 아닙니다." : "가입하실 이메일을 입력해주세요."}
          />
        </div>
        
        <div className="mt-auto mb-64">
          <Button
            variant="contained"
            fullWidth
            disabled={!isValidEmail || email.trim() === ''}
            className="bg-blue-500 hover:bg-blue-600 py-3"
            onClick={goNext}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Regist;
