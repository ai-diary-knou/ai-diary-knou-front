import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/main";
import CalendarPage from "./pages/calendar";
import DairyEditPage from "./pages/dairyEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/calendar",
        element: <CalendarPage />,
      },
      {
        path: "/edit",
        element: <DairyEditPage />,
      },
      },
      {
        path: "/menu",
        element: <div>Menu</div>,
      },
      {
        path: "/account",
        element: <div>Account</div>,
      },
    ],
  },
]);

export default router;
