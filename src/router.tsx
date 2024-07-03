import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages/main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/calendar",
        element: <div>Calendar</div>,
      },
      {
        path: "/edit",
        element: <div>Edit</div>,
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
