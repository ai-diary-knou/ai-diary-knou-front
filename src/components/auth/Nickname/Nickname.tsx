import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { setNickname, nextStep } from '../../../store/Slice/signupSlice';

import Input from "../../shared/Input";
import Button from '../../shared/Button';

import axios from 'axios';
import { USER_URL_PREFIX } from '../../../mocks/users/handlers';
const Nickname: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nickname = useSelector((state: RootState) => state.signup.nickname);
  const [isValidNickname, setIsValidNickname] = useState(true);
  const [helperMessage, setHelperMessage] = useState("사용하실 닉네임을 입력해주세요.");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);

  const validateNickname = (nickname: string): boolean => {
    const re = /^[a-zA-Z0-9가-힣]{2,20}$/;
    return re.test(nickname);
  };

  const checkNickname = async (value: string): Promise<{ isValid: boolean; code: string }> => {
    if (!value.trim() || !validateNickname(value)) {
      return { isValid: false, code: "INVALID_PARAMETER" };
    }
    
    try {
      const response = await axios.get(`${USER_URL_PREFIX}/duplicate`, {
        params: {
          type: "nickname",
          value: value,
        },
      });
      console.log(response.data);
      return { isValid: response.data.status === 'SUCCESS', code: response.data.code };
    } catch (error) {
      console.error(error);
      return { isValid: false, code: "ERROR" };
    }
  };

  useEffect(() => {
    const validateNicknameInput = async () => {
      if (nickname.trim() !== '') {
        setIsCheckingNickname(true);

        const { isValid, code } = await checkNickname(nickname);
        setIsValidNickname(isValid);

        switch (code) {
          case "INVALID_PARAMETER":
            setHelperMessage("올바른 닉네임 형식이 아닙니다.");
            break;
          case "ERROR":
            // alert("서버와 통신 중 오류가 발생했습니다.");
            break;
          default:
            setHelperMessage("");
            break;
        }
        
        setIsCheckingNickname(false);
      } else {
        setIsValidNickname(true);
        setHelperMessage("사용하실 닉네임을 입력해주세요.");
      }
    };

    validateNicknameInput();
  }, [nickname]);

  const handleNicknameChange = (value: string): void => {
    dispatch(setNickname(value));
    if (value.trim() === '') {
      setIsValidNickname(true);
    }
  };

  const handleNextStep = async (): Promise<void> => {
    if (isValidNickname && nickname.trim() !== '') {
      setIsLoading(true);
      try {
        dispatch(nextStep());
      } catch (error) {
        console.error(error);
        // alert("다음 단계로 이동 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="mb-16">
        <Input
          fullWidth
          label="닉네임"
          variant="outlined"
          value={nickname}
          onChange={(e) => handleNicknameChange(e)}
          error={!isValidNickname}
          helperText={helperMessage}
          disabled={isLoading}
        />
      </div>
      <div className="mt-auto mb-64">
        <Button
          variant="contained"
          fullWidth
          className="bg-blue-500 hover:bg-blue-600 py-3"
          onClick={handleNextStep}
          disabled={!isValidNickname || nickname.trim() === '' || isLoading || isCheckingNickname}
        >
          {isLoading ? "처리 중..." : "다음"}
        </Button>
      </div>
    </>
  );
};

export default Nickname;