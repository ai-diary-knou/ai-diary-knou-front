import React from 'react';
import Button from '../shared/Button';
import { useNavigate } from 'react-router-dom';

interface completeProps {
  text: string;
}

const Verify: React.FC<completeProps> = ({text}) => {

  const navigate = useNavigate();

  return (
    <>
      <div className="items-center mb-16">
        <label className="flex justify-center items-center">{`${text}`}</label>
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