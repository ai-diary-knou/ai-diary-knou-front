// router.tsx

import { createBrowserRouter, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

// 컴포넌트 임포트
import Onboarding from "./pages/onboarding";
import Login from "./pages/login";
import Regist from "./pages/regist";
import ForgotPassword from "./pages/forgotPassword";

import axios from "axios";
import { USER_URL_PREFIX } from './mocks/users/handlers';
import React from "react";

// 토큰 확인
const checkToken = async (): Promise<'valid' | 'invalid' | 'none'> => {
  const token = Cookies.get('accessToken');
  if (!token) return 'none';

  try {
    const response = await axios.post(`${USER_URL_PREFIX}/me`, { token });
    return response.data.status !== 'FAIL' ? 'valid' : 'invalid';
  } catch (error) {
    console.error('There was an error!', error);
    return 'invalid';
  }
};

// 로그인 필요한 페이지
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [tokenStatus, setTokenStatus] = React.useState<'valid' | 'invalid' | 'none' >('none');

  React.useEffect(() => {
    checkToken().then(setTokenStatus);
  }, []);

  // 토큰이 없으면
  if (tokenStatus === 'none') {
    return <Navigate to="/onboarding" replace />;
  }

  // 토큰이 유효하지 않음
  if (tokenStatus === 'invalid') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// 로그인 필요없는 페이지
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const [tokenStatus, setTokenStatus] = React.useState<'valid' | 'invalid' | 'none' >('none');

  React.useEffect(() => {
    checkToken().then(setTokenStatus);
  }, []);

  // 이미 로그인한 경우
  if (tokenStatus === 'valid') {
    return <Navigate to="/" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><div>home!</div></ProtectedRoute>,
  },
  {
    path: "/login",
    element: <PublicRoute><Login /></PublicRoute>,
  },
  {
    path: "/onboarding",
    element: <PublicRoute><Onboarding /></PublicRoute>,
  },
  {
    path: "/regist",
    element: <PublicRoute><Regist /></PublicRoute>,
  },
  {
    path: "/forgotPassword",
    element: <PublicRoute><ForgotPassword /></PublicRoute>,
  },
]);

export default router;