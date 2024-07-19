import { createTheme } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as Provider } from "@emotion/react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// pretendard 폰트
const pretendardFont = `
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
`;

const theme = createTheme({
  palette: {
    primary: {
      main: "#499F92",
    },
    error: {
      main: "#FF0000",
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: 'Pretendard, Arial, sans-serif',
          fontWeight: 700,  // 볼드체
          '&::before': {
            content: '""',
            display: 'block',
            height: 0,
            width: 0,
            overflow: 'hidden',
            visibility: 'hidden',
            fontFamily: 'Pretendard, Arial, sans-serif',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        ${pretendardFont}
      `,
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