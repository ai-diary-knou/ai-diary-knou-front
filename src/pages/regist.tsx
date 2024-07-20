import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Email from '../components/regist/email';
import Verify from '../components/regist/verify';
import Nickname from '../components/regist/nickname';
import Password from '../components/regist/password';
import CompleteRegist from '../components/regist/completeRegist';
import AppBar from '../components/shared/AppBar';
import Title from '../components/shared/Title';

const Regist: React.FC = () => {
  const currentStep = useSelector((state: RootState) => state.signup.currentStep);

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
        return <CompleteRegist />;
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