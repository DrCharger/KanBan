import type { FC, ReactNode } from "react";
import type { Theme } from "@mui/material";
import { ThemeProvider as StyledComponentProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";

import GlobalStyle from "./GlobalStyle";

type ThemeProviderProps = {
  children: ReactNode;
  theme: Theme;
  justify?: string;
};

const ThemeProvider: FC<ThemeProviderProps> = ({ children, theme }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledComponentProvider theme={theme}>
        <GlobalStyle />
        {children}
      </StyledComponentProvider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
