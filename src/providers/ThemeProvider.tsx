import { createTheme } from "@mui/material/styles";
import { ThemeProvider as Provider } from "@emotion/react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#499F92",
    },
    error: {
      main: "#FF0000",
    },
  },
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <Provider theme={theme}>{children}</Provider>;
};

export default ThemeProvider;