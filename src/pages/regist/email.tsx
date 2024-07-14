import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Input from "../../components/shared/Input";
import Button from '../../components/shared/Button';
import AppBar from '../../components/shared/AppBar';
import Title from '../../components/shared/Title';

import axios from 'axios';

import { USER_URL_PREFIX } from '../../mocks/users/handlers';

const Regist: React.FC = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value.trim() !== '') {
      setIsValidEmail(validateEmail(value));
    } else {
      setIsValidEmail(true);
    }
  };

  function goToVerify(): void {
    navigate("/verify");
  }

  useEffect(() => {
    if (email.trim() !== '') {
      console.log(email);

      axios
        .get(USER_URL_PREFIX + "/duplicate", {
          params: {
            type: "email",
            value: email,
          },
        })
        .then((response) => {
          console.log('Response:', response);
          console.log('Status:', response.status);
          console.log('Data:', response.data);
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    }
  }, [email]);

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
            onClick={goToVerify}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Regist;
