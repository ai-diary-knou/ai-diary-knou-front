import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { setPassword, setRePassword, nextStep } from '../../../store/Slice/signupSlice';

import Input from "../../shared/Input";
import Button from '../../shared/Button';

import axios from 'axios';
import { USER_URL_PREFIX } from '../../../mocks/users/handlers';
const Password: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.signup.email);
  const nickname = useSelector((state: RootState) => state.signup.nickname);
  const password = useSelector((state: RootState) => state.signup.password);
  const rePassword = useSelector((state: RootState) => state.signup.rePassword);

  const [isValidPassword, setIsValidPassword] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [helperMessage, setHelperMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);

  const validatePassword = (password: string): boolean => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return re.test(password);
  };

  useEffect(() => {
    const validatePasswordInput = async () => {
      if (password.trim() !== '') {
        setIsCheckingPassword(true);
  
        // 비밀번호 형식만 확인
        const isValid = validatePassword(password);
        setIsValidPassword(isValid);
  
        if (!isValid) {
          setHelperMessage("유효하지 않은 비밀번호입니다.");
        } else {
          setHelperMessage("");
        }
  
        // 비밀번호 일치 여부 확인 (두 번째 입력창에 값이 있을 때만)
        if (rePassword.trim() !== '') {
          setPasswordsMatch(password === rePassword);
        }
  
        setIsCheckingPassword(false);
      } else {
        setIsValidPassword(true);
        setPasswordsMatch(true);
        setHelperMessage("");
      }
    };
  
    validatePasswordInput();
  }, [password, rePassword]);

  const handlePasswordChange = (value: string): void => {
    dispatch(setPassword(value));
  };

  const handleRePasswordChange = (value: string): void => {
    dispatch(setRePassword(value));
  };

  const handleNextStep = async (): Promise<void> => {
    if (isValidPassword && passwordsMatch && password.trim() !== '' && rePassword.trim() !== '') {
      setIsLoading(true);
      console.log(email);
      console.log(nickname);
      try {
        const response = await axios.post(USER_URL_PREFIX, {
          email,
          nickname,
          password,
          rePassword,
        });
        console.log(response.data);
        dispatch(nextStep());
      } catch (error) {
        console.error('Error in handleNextStep:', error);
        setHelperMessage("회원가입 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="mb-4">
        <Input
          fullWidth
          label="비밀번호"
          variant="outlined"
          value={password}
          onChange={(e) => handlePasswordChange(e)}
          error={!isValidPassword && password !== ''}
          helperText={isValidPassword ? "" : helperMessage}
          secureTextEntry
          disabled={isLoading}
        />
    </div>
    <div className="mb-4">
      <Input
        fullWidth
        label="비밀번호 확인"
        variant="outlined"
        value={rePassword}
        onChange={(e) => handleRePasswordChange(e)}
        error={!passwordsMatch && rePassword !== ''}
        helperText={!passwordsMatch && rePassword !== '' ? "비밀번호가 일치하지 않습니다." : ""}
        secureTextEntry
        disabled={isLoading}
      />
    </div>
      <div className="mt-auto mb-64">
        <Button
          variant="contained"
          fullWidth
          className="bg-blue-500 hover:bg-blue-600 py-3"
          onClick={handleNextStep}
          disabled={!isValidPassword || !passwordsMatch || password.trim() === '' || rePassword.trim() === '' || isLoading || isCheckingPassword}
        >
          {isLoading ? "처리 중..." : "다음"}
        </Button>
      </div>
    </>
  );
};

export default Password;
