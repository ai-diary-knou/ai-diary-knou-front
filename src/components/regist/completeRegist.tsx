import React from 'react';
import Button from '../shared/Button';
import { useNavigate } from 'react-router-dom';

const Verify: React.FC = () => {

  const navigate = useNavigate();
  
  return (
    <>
      <div className="items-center mb-16">
        <label className="flex justify-center items-center">성장일기님 회원 가입을 축하드립니다!</label>
      </div>
      <div className="mt-auto mb-64">
      <Button
        variant="contained"
        fullWidth
        className="bg-blue-500 hover:bg-blue-600 py-3"
        onClick={() => navigate("/login")}
      >
        다음
      </Button>
    </div>
  </>
  );
};

export default Verify;