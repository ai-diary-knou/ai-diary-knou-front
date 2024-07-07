import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Onboarding from "./pages/onboarding";
import Regist from "./pages/regist";

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
    path: "/regist",
    element: <Regist />,
  },
]);

export default router;
