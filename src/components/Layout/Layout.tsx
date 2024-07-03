import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className="max-w-md mx-auto bg-[#F3F5F6] h-screen">
      <Outlet />
      <Navigation />
    </div>
  );
};

export default Layout;
