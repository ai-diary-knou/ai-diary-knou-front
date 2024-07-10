import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Onboarding from "./pages/onboarding";
import Email from "./pages/regist/email";
import Verify from "./pages/regist/verify"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <div>Login</div>,
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
]);

export default router;
