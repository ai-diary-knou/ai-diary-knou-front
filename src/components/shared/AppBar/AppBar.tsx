import React from 'react';
import { AppBar as MuiAppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const BackButton: React.FC = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <IconButton
      edge="start"
      aria-label="back"
      onClick={handleBack}
      className="text-gray-800"
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

const AppBar: React.FC = () => {
  return (
    <MuiAppBar 
      position="static" 
      elevation={0} 
      className="bg-white && !bg-white"
    >
      <Toolbar className="pl-4">
        <BackButton />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;