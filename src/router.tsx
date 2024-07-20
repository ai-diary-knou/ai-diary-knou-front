// router.tsx

import { createBrowserRouter, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

// 컴포넌트 임포트
import Onboarding from "./pages/onboarding";
import Login from "./pages/login";

import Regist from "./pages/regist";

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

// 라우트 보호 컴포넌트
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [tokenStatus, setTokenStatus] = React.useState<'valid' | 'invalid' | 'none' | 'loading'>('loading');

  React.useEffect(() => {
    checkToken().then(setTokenStatus);
  }, []);

  if (tokenStatus === 'loading') {
    return <div>Loading...</div>; // Or some loading component
  }

  if (tokenStatus === 'none') {
    return <Navigate to="/onboarding" replace />;
  }

  if (tokenStatus === 'invalid') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// 공개 라우트 컴포넌트
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const [tokenStatus, setTokenStatus] = React.useState<'valid' | 'invalid' | 'none' | 'loading'>('loading');

  React.useEffect(() => {
    checkToken().then(setTokenStatus);
  }, []);

  if (tokenStatus === 'loading') {
    return <div>Loading...</div>; // Or some loading component
  }

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
  }
]);

export default router;