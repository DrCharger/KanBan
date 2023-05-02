import React from "react";
import HomeRouter from "./components/home/HomeRouter";
import { createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./store";
import palette from "./theme/options/palette";
import ThemeProvider from "./theme/ThemeProvider";

const theme = createTheme({
  palette,
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <HomeRouter />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
