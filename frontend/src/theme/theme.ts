import { createTheme } from "@mui/material/styles";

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
      light: "#42a5f5",
      dark: "#9c27b0",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
    },
    background: {
      default: "#f4f4f4",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary :"#9c27b0"
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: { fontSize: "2.5rem", fontWeight: 600 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    h3: { fontSize: "1.75rem", fontWeight: 600 },
    body1: { fontSize: "1rem", lineHeight: 1.5 },
    button: { textTransform: "none" },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
      light: "#63a4ff",
      dark: "#004ba0",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: { ...lightTheme.typography },
  components: { ...lightTheme.components },
});
