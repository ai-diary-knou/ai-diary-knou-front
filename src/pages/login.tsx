import React, { useState } from "react";

import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import AppBar from "../components/shared/AppBar";
import Title from "../components/shared/Title";
import { showToast } from "../components/shared/Toast";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setInitialize } from "../store/Slice/signupSlice";
import axiosInst from "../util/axiosInst";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [helperText, setHelperText] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setHelperText(""); // 비밀번호가 변경될 때 helperText를 초기화합니다.
  };

  const login = (): void => {
    axiosInst
      .post("/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        if (response.data.status !== "SUCCESS") {
          switch (response.data.code) {
            case "USER_LOGIN_FAIL":
              setHelperText(
                "잘못된 계정정보를 입력하였습니다. 5회 실패시 계정이 잠금됩니다."
              );
              break;
            case "USER_LOGIN_LOCKED":
              setHelperText("비밀번호 5회 실패로 인해 계정이 잠금되었습니다.");
              break;
            case "USER_ALREADY_SIGNED_OUT":
              setHelperText("이미 탈퇴한 계정입니다.");
              break;
            default:
              setHelperText("로그인에 실패했습니다. 다시 시도해 주세요.");
              break;
          }
        } else {
          setHelperText("");
          // 로그인 성공 처리
          localStorage.setItem("token", response.data.data);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        showToast({
          message: "에러 발생",
          type: "error",
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const handleForgotPasswordClick = () => {
    dispatch(setInitialize());
    navigate("/forgotPassword");
  };

  return (
    <div className="mx-auto bg-white flex flex-col h-screen">
      <AppBar />
      <Title title="로그인" />
      <div className="flex-grow flex flex-col justify-center px-6">
        <div className="mb-4">
          <Input
            fullWidth
            label="이메일"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            error={!isValidEmail && email !== ""}
            helperText={
              !isValidEmail && email !== ""
                ? "유효한 이메일 주소를 입력해주세요."
                : ""
            }
          />
        </div>
        <div className="mb-4">
          <Input
            fullWidth
            label="비밀번호"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            error={helperText !== ""}
            helperText={helperText}
          />
        </div>
        <div className="mb-4 text-right">
          <button
            onClick={handleForgotPasswordClick}
            className="text-sm bg-transparent border-none cursor-pointer hover:text-blue-800"
          >
            비밀번호 찾기
          </button>
        </div>
        <div className="mt-auto mb-64">
          <Button
            variant="contained"
            fullWidth
            onClick={login}
            disabled={
              !isValidEmail || email.trim() === "" || password.trim() === ""
            }
            className="bg-blue-500 hover:bg-blue-600 py-3"
          >
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
