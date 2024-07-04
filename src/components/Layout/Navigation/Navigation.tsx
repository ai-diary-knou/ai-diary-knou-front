import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddIcon from "../../../icons/AddIcon";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed max-w-md w-full bottom-0 border-t-2 border-t-black h-16 z-50 bg-[#F3F5F6]">
      <ul className="flex items-center justify-around h-full px-2">
        <li>
          <Link to="/">
            <HomeIcon
              color={location.pathname === "/" ? "primary" : "inherit"}
              fontSize="large"
            />
          </Link>
        </li>
        <li>
          <Link to="/calendar">
            <CalendarMonthIcon
              color={location.pathname === "/calendar" ? "primary" : "inherit"}
              fontSize="large"
            />
          </Link>
        </li>
        <li>
          <Link to="/edit">
            <AddIcon />
          </Link>
        </li>
        <li>
          <Link to="/menu">
            <MenuBookIcon
              color={location.pathname === "/menu" ? "primary" : "inherit"}
              fontSize="large"
            />
          </Link>
        </li>
        <li>
          <Link to="/account">
            <AccountCircleIcon
              color={location.pathname === "/account" ? "primary" : "inherit"}
              fontSize="large"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
