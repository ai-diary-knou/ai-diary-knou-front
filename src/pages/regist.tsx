import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import Email from "../components/auth/Email";
import Verify from "../components/auth/Verify";
import Nickname from "../components/auth/Nickname";
import Password from "../components/auth/Password";
import Complete from "../components/auth/Complete";

import AppBar from "../components/shared/AppBar";
import Title from "../components/shared/Title";

const Regist: React.FC = () => {
  const currentStep = useSelector(
    (state: RootState) => state.signup.currentStep
  );

  const completeProps = {
    text: "성장일기님 회원 가입을 축하드립니다!!",
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Email />;
      case 2:
        return <Verify />;
      case 3:
        return <Nickname />;
      case 4:
        return <Password />;
      case 5:
        return <Complete {...completeProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto bg-white flex flex-col h-screen">
      <AppBar />
      <Title title="회원가입" />
      <div className="flex-grow flex flex-col justify-center px-6">
        {renderStep()}
      </div>
    </div>
  );
};

export default Regist;
