import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import Input from "../components/shared/Input"
import Button from '../components/shared/Button';

const Regist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  };

  return (
    <div className="mx-auto bg-white flex flex-col h-screen">
      <AppBar position="static" color="transparent" elevation={0} className="pt-12 pb-6">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            회원가입
          </Typography>
        </Toolbar>
      </AppBar>
      
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
            disabled={!isValidEmail || email === ''}
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