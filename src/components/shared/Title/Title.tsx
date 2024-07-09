import React from 'react';
import { Typography } from '@mui/material';

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="bg-white py-16 px-16 flex justify-center items-center">
      <Typography 
        variant="h6" 
        component="h1" 
        className="text-gray-800 font-bold text-center"
      >
        {title}
      </Typography>
    </div>
  );
};

export default Title;