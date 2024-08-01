// router.tsx

import { createBrowserRouter, Navigate } from "react-router-dom";

// 컴포넌트 임포트
import Onboarding from "./pages/onboarding";
import Login from "./pages/login";
import Regist from "./pages/regist";
import ForgotPassword from "./pages/forgotPassword";
import Layout from "./components/Layout";
import MainPage from "./pages/main";
import CalendarPage from "./pages/calendar";
import DairyEditPage from "./pages/dairyEdit";
import DairyDetailPage from "./pages/dairyDetail";

import React from "react";
import { AppDispatch } from "./store/store";
import { useDispatch } from "react-redux";
import { login } from "./store/Slice/userSlice";
import axiosInst from "./util/axiosInst";

interface TokenResponse {
  isValid: boolean;
  user: {
    email: string;
    nickname: string;
  };
}

// 토큰 확인
const checkToken = async (): Promise<TokenResponse> => {
  try {
    const response = await axiosInst.get(`$/users/me`);

    return {
      isValid: response.data.status === "SUCCESS",
      user: response.data.data,
    };
  } catch (error) {
    console.error("There was an error!", error);
    return {
      isValid: false,
      user: {
        email: "",
        nickname: "",
      },
    };
  }
};

// 로그인 필요한 페이지
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [tokenStatus, setTokenStatus] = React.useState<
    "valid" | "invalid" | "none"
  >("none");
  const dispatch = useDispatch<AppDispatch>();

  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    checkToken().then(({ isValid, user }) => {
      setTokenStatus(isValid ? "valid" : "invalid");

      dispatch(login(user));
      setInit(true);
    });
  }, [dispatch]);

  if (!init) {
    return <div></div>;
  }

  // 토큰이 없으면
  if (tokenStatus === "none") {
    return <Navigate to="/onboarding" replace />;
  }

  // 토큰이 유효하지 않음
  if (tokenStatus === "invalid") {
    const isOnboarding = window.localStorage.getItem("isOnboarding");

    return isOnboarding ? (
      <Navigate to="/login" replace />
    ) : (
      <Navigate to="/onboarding" replace />
    );
  }

  return children;
};

// 로그인 필요없는 페이지
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const [tokenStatus, setTokenStatus] = React.useState<
    "valid" | "invalid" | "none"
  >("none");

  React.useEffect(() => {
    checkToken().then(({ isValid }) => {
      setTokenStatus(isValid ? "valid" : "invalid");
    });
  }, []);

  // 이미 로그인한 경우
  if (tokenStatus === "valid") {
    return <Navigate to="/" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <MainPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/onboarding",
        element: (
          <PublicRoute>
            <Onboarding />
          </PublicRoute>
        ),
      },
      {
        path: "/regist",
        element: (
          <PublicRoute>
            <Regist />
          </PublicRoute>
        ),
      },
      {
        path: "/forgotPassword",
        element: (
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        ),
      },
      {
        path: "/calendar",
        element: (
          <ProtectedRoute>
            <CalendarPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit",
        element: (
          <ProtectedRoute>
            <DairyEditPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/dairy/:dairyId",
        element: (
          <ProtectedRoute>
            <DairyDetailPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/menu",
        element: <div>Menu</div>,
      },
      {
        path: "/account",
        element: (
          <ProtectedRoute>
            <div>Account</div>,
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
