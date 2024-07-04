import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <main className="max-w-md mx-auto min-h-screen overflow-auto">
      <Outlet />
      <Navigation />
    </main>
  );
};

export default Layout;
