import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setEmail, nextStep } from '../../store/store';
import Input from "../shared/Input";
import Button from '../shared/Button';
import axios from 'axios';
import { USER_URL_PREFIX } from '../../mocks/users/handlers';

const Email: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.signup.email);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const checkEmail = (value: string): Promise<boolean> => {
    return axios
      .get(`${USER_URL_PREFIX}/duplicate`, {
        params: {
          type: "email",
          value: value,
        },
      })
      .then((response) => {
        console.log(response.data);
        return true;
      })
      .catch((error) => {
        console.error('There was an error!', error);
        return false;
      });
  };

  const sendVerifcationCode = async (value: string): Promise<void> => {
    axios
      .post(`${USER_URL_PREFIX}/email/auth-code`, {
        email: value,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleEmailChange = (value: string): void => {
    dispatch(setEmail(value));
    setIsValidEmail(value.trim() === '' || validateEmail(value));
  };

  const handleNextStep = async (): Promise<void> => {
    if (isValidEmail && email.trim() !== '') {
      const isEmailValid = await checkEmail(email);
      if (isEmailValid) {
        sendVerifcationCode(email);
        dispatch(nextStep());
      } else {
        console.log("중복된 이메일");
      }
    }
  };

  return (
    <>
      <div className="mb-16">
        <Input
          fullWidth
          label="이메일"
          variant="outlined"
          value={email}
          onChange={(e) => handleEmailChange(e)}
          error={!isValidEmail}
          helperText={!isValidEmail ? "올바른 이메일 형식이 아닙니다." : "이메일을 입력해주세요."}
        />
      </div>
      <div className="mt-auto mb-64">
        <Button
          variant="contained"
          fullWidth
          className="bg-blue-500 hover:bg-blue-600 py-3"
          onClick={handleNextStep}
          disabled={!isValidEmail || email.trim() === ''}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default Email;