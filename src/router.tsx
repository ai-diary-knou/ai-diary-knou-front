// router.tsx

import { createBrowserRouter, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

// 컴포넌트 임포트
import Onboarding from "./pages/onboarding";
import Email from "./pages/regist/email";
import Verify from "./pages/regist/verify";
import Password from "./pages/regist/password";
import Login from "./pages/regist/login";
import CompleteRegist from "./pages/completeRegist";
import Nickname from "./pages/regist/nickname";

// 토큰 확인
const isAuthenticated = (): boolean => {
  const token = Cookies.get('accessToken');
  return !!token;
};

// 공개 페이지
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// 비공개 페이지
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  if (isAuthenticated()) {
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
    element: <ProtectedRoute><Onboarding /></ProtectedRoute>,
  },
  {
    path: "/email",
    element: <PublicRoute><Email /></PublicRoute>,
  },
  {
    path: "/verify",
    element: <PublicRoute><Verify /></PublicRoute>,
  },
  {
    path: "/password",
    element: <PublicRoute><Password /></PublicRoute>,
  },
  {
    path: "/completeRegist",
    element: <PublicRoute><CompleteRegist /></PublicRoute>,
  },
  {
    path: "/nickname",
    element: <PublicRoute><Nickname /></PublicRoute>,
  }
]);

export default router;