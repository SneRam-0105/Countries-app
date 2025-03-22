import { createContext, useContext } from "react";

type ThemeContextType = {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
