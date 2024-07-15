import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Input from "../../components/shared/Input"
import Button from '../../components/shared/Button'
import AppBar from '../../components/shared/AppBar';
import Title from '../../components/shared/Title';

import axios from 'axios';

import { USER_URL_PREFIX } from '../../mocks/users/handlers';

const Verify: React.FC = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [email] = useState('');
  const [isValidCode, setIsValidCode] = useState(true);

  const validateCode = (code: string) => {
    const re = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    return re.test(code);
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
    // 입력값이 비어있지 않을 때만 유효성 검사를 수행
    if (value.trim() !== '') {
      setIsValidCode(validateCode(value));
    } else {
      // 입력값이 비어있으면 유효성 상태를 true로 설정
      setIsValidCode(true);
    }
  };

  const chkVerifyCode = (): void => {
    console.log("checkVerifyCode");
    axios
      .post(USER_URL_PREFIX + "/email/auth", {
          email: email,
          code : code,
      })
      .then((response) => {
        // 서버응답 처리
        console.log(response.status);
        navigate("/password");
      })
      .catch((error) => {
        console.error('There was an error!', error);
      })
  }

  return (
    <div className="mx-auto bg-white flex flex-col h-screen">
      <AppBar/>
      <Title title="회원가입" />      
      <div className="flex-grow flex flex-col justify-center px-6">
        <div className="mb-16">
          <Input
            fullWidth
            label="인증코드"
            variant="outlined"
            value={code}
            onChange={handleCodeChange}
            error={!isValidCode}
            helperText={!isValidCode ? "인증번호를 확인해주세요." : "이메일로 전송된 인증번호를 5분 이내에 입력해주세요."}
          />
        </div>
        
        <div className="mt-auto mb-64">
          <Button
            variant="contained"
            fullWidth
            disabled={!isValidCode || code.trim() === ''}
            className="bg-blue-500 hover:bg-blue-600 py-3"
            onClick={chkVerifyCode}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Verify;