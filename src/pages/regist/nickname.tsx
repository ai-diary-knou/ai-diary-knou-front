import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

import Input from "../../components/shared/Input";

import axios from 'axios';

import { USER_URL_PREFIX } from '../../mocks/users/handlers';
import { AppDispatch, setNickname } from '../../store/store';

const Regist: React.FC = () => {
  const navigate = useNavigate();
  
  const [nickname, set_Nickname] = useState('');
  const [isValidNickname, setIsValidNickname] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const validateNickname = (nickname: string) => {
    // 닉네임 유효성 검사 로직 (예: 2-20자 사이, 특수문자 제외)
    const re = /^[a-zA-Z0-9가-힣]{2,20}$/;
    return re.test(nickname);
  };

  const handleNicknameChange = (value: string) => {
    set_Nickname(value);
    if (value.trim() !== '') {
      setIsValidNickname(validateNickname(value));
    } else {
      setIsValidNickname(true);
    }
  };

  const goNext = (): void => {
    console.log(nickname);
    if (nickname.trim() !== '') {
      axios
        .get(USER_URL_PREFIX + "/duplicate", {
          params: {
            type: "nickname",
            value: nickname,
          },
        })
        .then((response) => {
          console.log(response.data);
          if(response.data.status === "SUCCESS") {
            dispatch(setNickname(nickname));
            navigate("/password");
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    }
  }

  return (
    <div className="mb-16">
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
  );
};

export default Regist;