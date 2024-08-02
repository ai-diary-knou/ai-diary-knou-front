import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import Password from "../components/password/Password";
import Complete from "../components/auth/Complete";

import AppBar from "../components/shared/AppBar";
import Title from "../components/shared/Title";

const Regist: React.FC = () => {
  const currentStep = useSelector(
    (state: RootState) => state.signup.currentStep
  );

  const completeProps = {
    text: "다음 로그인부터 변경된 비밀번호를 사용해주세요.",
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Password />;
      case 2:
        return <Complete {...completeProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto bg-white flex flex-col h-screen">
      <AppBar />
      <Title title="비밀번호 변경" />
      <div className="flex-grow flex flex-col justify-center px-6">
        {renderStep()}
      </div>
    </div>
  );
};

export default Regist;
