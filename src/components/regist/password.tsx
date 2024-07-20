import React, { useState, useEffect } from 'react';


import Input from "../../components/shared/Input"
import { AppDispatch, nextStep, RootState, setPassword, setRePassword } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../shared/Button';
import axios from 'axios';
import { USER_URL_PREFIX } from '../../mocks/users/handlers';
import Regist from './nickname';


const Password: React.FC = () => {

  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const email = useSelector((state: RootState) => state.signup.email);
  const nickname = useSelector((state: RootState) => state.signup.nickname);
  const password = useSelector((state: RootState) => state.signup.password);
  const rePassword = useSelector((state: RootState) => state.signup.rePassword);
  const dispatch = useDispatch<AppDispatch>();
  
  const validatePassword = (password: string) => {
    // 최소 8자, 최대 20자, 최소 하나의 대문자, 소문자, 숫자, 특수문자 포함
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return re.test(password);
  };

  useEffect(() => {
    setIsValidPassword(validatePassword(password));
    setPasswordsMatch(password === rePassword);
  }, [password, rePassword]);

  const handlePasswordChange = (value: string) => {
    dispatch(setPassword(value));
  };

  const handleRePasswordChange = (value: string) => {
    dispatch(setRePassword(value));
  };

  const handleNextStep = async (): Promise<void> => {
    if (isValidPassword && password.trim() !== '') {
      const isEmailValid = await regist();
      dispatch(nextStep());
      /*
      if (isEmailValid) {
        dispatch(nextStep());
      } else {
        console.log("중복된 이메일");
      }*/
    }
  };

  const regist = (): void => {
    console.log(email);
    console.log(nickname);
    console.log(password);
    console.log(rePassword);

    axios
      .post(USER_URL_PREFIX, {
          email: email,
          nickname: nickname,
          password: password,
          rePassword: rePassword,
      })
      .then((response) => {
        // 서버응답 처리
        console.log(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      })
  };

  return (
    <>
      <div className="mb-4">
        <Input
          fullWidth
          label="비밀번호"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
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
          onChange={handleRePasswordChange}
          error={!passwordsMatch && rePassword !== ''}
          helperText={!passwordsMatch && rePassword !== '' ? "비밀번호가 일치하지 않습니다." : ""}
          secureTextEntry
        />
      </div>
      <div className="mt-auto mb-64">
        <Button
          variant="contained"
          fullWidth
          className="bg-blue-500 hover:bg-blue-600 py-3"
          onClick={handleNextStep}
          disabled={!isValidPassword || password.trim() === '' || rePassword.trim() === ''}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default Password;