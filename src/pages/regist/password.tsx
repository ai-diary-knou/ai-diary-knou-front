import React, { useState, useEffect } from 'react';
import Input from "../../components/shared/Input"
import Button from '../../components/shared/Button'
import AppBar from '../../components/shared/AppBar';
import Title from '../../components/shared/Title';

const Password: React.FC = () => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const validatePassword = (password: string) => {
    // 최소 8자, 최대 20자, 최소 하나의 대문자, 소문자, 숫자, 특수문자 포함
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return re.test(password);
  };

  useEffect(() => {
    setIsValidPassword(validatePassword(password1));
    setPasswordsMatch(password1 === password2);
  }, [password1, password2]);

  const handlePasswordChange1 = (value: string) => {
    setPassword1(value);
  };

  const handlePasswordChange2 = (value: string) => {
    setPassword2(value);
  };

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
            value={password1}
            onChange={handlePasswordChange1}
            error={!isValidPassword && password1 !== ''}
            helperText={!isValidPassword && password1 !== '' ? "비밀번호는 8-20자의 대소문자, 숫자, 특수문자를 포함해야 합니다." : ""}
            secureTextEntry
          />
        </div>
        <div className="mb-4">
          <Input
            fullWidth
            label="비밀번호 확인"
            variant="outlined"
            value={password2}
            onChange={handlePasswordChange2}
            error={!passwordsMatch && password2 !== ''}
            helperText={!passwordsMatch && password2 !== '' ? "비밀번호가 일치하지 않습니다." : ""}
            secureTextEntry
          />
        </div>
        <div className="mt-auto mb-64">
          <Button
            variant="contained"
            fullWidth
            disabled={!isValidPassword || !passwordsMatch || password1.trim() === '' || password2.trim() === ''}
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