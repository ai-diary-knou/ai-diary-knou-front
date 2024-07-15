import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '../components/shared/Button'
import AppBar from '../components/shared/AppBar';
import Title from '../components/shared/Title';

const Verify: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto bg-white flex flex-col h-screen">
      <AppBar/>
      <Title title="회원가입 완료!" />      
      <div className="flex-grow flex flex-col justify-center px-6">
        <div className="items-center mb-16">
            <label className="flex justify-center items-center">성장일기님 회원 가입을 축하드립니다!</label>
        </div>
        
        <div className="mt-auto mb-64">
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/login")}
            className="bg-blue-500 hover:bg-blue-600 py-3"
          >
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Verify;