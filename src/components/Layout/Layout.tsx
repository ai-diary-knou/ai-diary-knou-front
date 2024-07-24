import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  const location = useLocation();

  const isShowNavigation =
    location.pathname !== "/login" &&
    location.pathname !== "/regist" &&
    location.pathname !== "/forgotPassword" &&
    location.pathname !== "/onboarding";

  return (
    <main className="max-w-md mx-auto min-h-screen overflow-auto">
      <Outlet />
      {isShowNavigation && <Navigation />}
    </main>
  );
};

export default Layout;
