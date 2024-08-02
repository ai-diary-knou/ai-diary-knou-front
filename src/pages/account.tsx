import React from 'react';
import Divider from "@mui/material/Divider";
import Typography from "../components/shared/Typography";
import Box from "@mui/material/Box";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { DIARY_URL_PREFIX } from '../mocks/diary/handlers';
import axiosInst from '../util/axiosInst';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Account: React.FC = () => {
  const navigate = useNavigate();

  // 일기 개수 조회
  const { data: diaryCount } = useQuery({
    queryKey: ["diaryCount"],
    queryFn: async () => {
      const response = await axiosInst.get(DIARY_URL_PREFIX + "/count");
      console.log(response.data);
      return response.data.data;
    },
  });

  const handleProfileSettings = () => {
    console.log('Profile settings clicked');
    // Add your logic for profile settings
    navigate('/profile', {state:{ title: "프로필 설정", } });
  };

  const handleChangePassword = () => {
    console.log('Change password clicked');
    // Add your logic for changing password
    navigate('/changePassword');
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Add your logic for logout
  };

  return (
    <div className="mx-8 py-[60px]">
      <Typography variant="h5">성장일기</Typography>
      <Divider sx={{ my: 1, mt: 7, borderColor: 'black' }} />
      <div className="flex items-center my-[30px]">
        <div className="flex-1 text-center">
          <div>작성한 일기</div>
          <div>{diaryCount ?? 0}</div>
        </div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1"></div>
      </div>
      <Divider sx={{ my: 1, mb: 7, borderColor: 'black' }} />
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mt={2}
        onClick={handleProfileSettings}
        style={{ cursor: 'pointer' }}
      >
        <div>프로필 설정</div>
        <ChevronRightIcon />
      </Box>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mt={2}
        onClick={handleChangePassword}
        style={{ cursor: 'pointer' }}
      >
        <div>비밀번호 변경</div>
        <ChevronRightIcon />
      </Box>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mt={2}
        onClick={handleLogout}
        style={{ cursor: 'pointer' }}
      >
        <div>로그아웃</div>
        <ChevronRightIcon />
      </Box>
    </div>
  );
};

export default Account;