import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { TextField } from '@mui/material';
import { RootState } from '../../store/store';

const Verify: React.FC = () => {

  const [code, setCode] = useState('');
  const [isValidCode, setIsValidCode] = useState(true);
  const [timer, setTimer] = useState(180);
  const [isExpired, setIsExpired] = useState(false);

  const selector = useSelector((state: RootState) => state);

  useEffect(() => {
    if (timer > 0 && !isExpired) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsExpired(true);
    }
    console.log(selector.user.email);
  }, [timer, isExpired]);

  const validateCode = (code: string) => {
    const re = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    return re.test(code);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCode(value);
    if (value.trim() !== '') {
      setIsValidCode(validateCode(value));
    } else {
      setIsValidCode(true);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="mb-16">
      <TextField
        fullWidth
        label="인증코드"
        variant="outlined"
        value={code}
        onChange={handleCodeChange}
        error={!isValidCode}
        size='small'
        helperText={
          !isValidCode 
            ? "인증번호를 확인해주세요." 
            : isExpired 
              ? "인증번호가 만료되었습니다." 
              : "이메일로 전송된 인증번호를 5분 이내에 입력해주세요."
        }
        disabled={isExpired}
      />
      {!isExpired && (
        <div style={{ marginTop: '1px', marginLeft:'13px', fontSize: '0.75rem', }}>
          남은 시간: {formatTime(timer)}
        </div>
      )}
    </div>
  );
};

export default Verify;