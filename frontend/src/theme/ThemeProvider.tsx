import { useState, useEffect, ReactNode, useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ThemeContext } from "./themeContext";
import { lightTheme, darkTheme } from "./theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
  const [themeMode, setThemeMode] = useState<"light" | "dark">(
    storedTheme || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () => (themeMode === "light" ? lightTheme : darkTheme),
    [themeMode]
  );

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
