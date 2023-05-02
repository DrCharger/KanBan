import { common } from "@mui/material/colors";

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    yellow: string;
  }

  interface Palette {
    support: {
      main: string;
      light: string;
      dark: string;
      darker: string;
    };
  }
}

const palette = {
  primary: {
    main: "rgba(70, 163, 88, 0.45)",
    contrastText: common.white,
  },
  support: {
    main: "#eee",
    light: "#c8cdcd",
    dark: "#999",
    darker: "#555e61",
  },
  common: {
    ...common,
    yellow: "#ffcd00",
  },
  secondary: {
    main: "rgba(70, 163, 88, 100%)",
    light: "#0f2d37",
    dark: "#00141e",
    contrastText: common.white,
  },
  background: {
    default: "#fff",
    paper: common.white,
  },
  text: {
    primary: "#00141e",
    secondary: "#3D3D3D",
    parag: "#727272",
    disabled: "#c8cdcd",
    icons: "rgb(128, 128, 128)",
  },
};
export default palette;
