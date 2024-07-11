import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";

import Onboarding from "./pages/onboarding";
import Email from "./pages/regist/email";
import Verify from "./pages/regist/verify";
import Password from "./pages/regist/password";
import Login from "./pages/regist/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/onboarding",
    element: <Onboarding/>,
  },
  {
    path: "/email",
    element: <Email />,
  },
  {
    path: "/verify",
    element: <Verify />
  },
  {
    path: "/password",
    element: <Password />
  }
]);

export default router;
