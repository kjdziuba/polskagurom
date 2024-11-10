// src/theme.js

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004d40", // Deep teal color
    },
    secondary: {
      main: "#ffab00", // Accent color
    },
    background: {
      default: "#f5f5f5", // Light gray background
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default theme;
