import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

import Email from '../components/password/Email';
import Verify from '../components/auth/Verify';
import Password from '../components/password/Password';
import Complete from '../components/auth/Complete';

import AppBar from '../components/shared/AppBar';
import Title from '../components/shared/Title';

const Regist: React.FC = () => {
  const currentStep = useSelector((state: RootState) => state.signup.currentStep);

  const completeProps = {
    text: "변경하신 비밀번호로 로그인 해주세요.",
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Email />;
      case 2:
        return <Verify />;
      case 3:
        return <Password />;
      case 4:
        return <Complete {...completeProps}/>;
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