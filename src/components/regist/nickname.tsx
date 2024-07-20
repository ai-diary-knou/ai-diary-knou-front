import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Input from "../../components/shared/Input";

import { AppDispatch, nextStep, RootState, setNickname } from '../../store/store';
import Button from '../shared/Button';
import { USER_URL_PREFIX } from '../../mocks/users/handlers';
import axios from 'axios';

const Regist: React.FC = () => {
  const nickname = useSelector((state: RootState) => state.signup.nickname);
  const [isValidNickname, setIsValidNickname] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const validateNickname = (nickname: string) => {
    // 닉네임 유효성 검사 로직 (예: 2-20자 사이, 특수문자 제외)
    const re = /^[a-zA-Z0-9가-힣]{2,20}$/;
    return re.test(nickname);
  };

  const handleNicknameChange = (value: string) => {
    dispatch(setNickname(value));
    setIsValidNickname(value.trim() === '' || validateNickname(value));
  };

  const handleNextStep = async (): Promise<void> => {
    if (isValidNickname && nickname.trim() !== '') {
      const isEmailValid = await checkNickname(nickname);
      if (isEmailValid) {
        dispatch(nextStep());
      } else {
        console.log("중복된 이메일");
      }
    }
  };

  const checkNickname = (value: string): Promise<boolean> => {
    return axios
      .get(`${USER_URL_PREFIX}/duplicate`, {
        params: {
          type: "nickname",
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

  return (
    <>
      <div>
        <Input
          fullWidth
          label="닉네임"
          variant="outlined"
          value={nickname}
          onChange={handleNicknameChange}
          error={!isValidNickname}
          helperText={!isValidNickname ? "올바른 닉네임 형식이 아닙니다." : "사용하실 닉네임을 입력해주세요."}
        />
      </div>
      <div className="mt-auto mb-64">
      <Button
        variant="contained"
        fullWidth
        className="bg-blue-500 hover:bg-blue-600 py-3"
        onClick={handleNextStep}
        disabled={!isValidNickname || nickname.trim() === ''}
      >
        다음
      </Button>
    </div>
  </>
  );
};

export default Regist;