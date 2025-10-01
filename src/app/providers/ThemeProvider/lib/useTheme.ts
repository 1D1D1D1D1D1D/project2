import { useContext } from "react";
import { Theme, ThemeContext } from "./ThemeContext";

export const LOCAL_STORAGE_THEME_KEY = 'theme'
interface UseThemeResult {
    toggleTheme: (theme: Theme) => void,
    theme?: Theme
}
const currentTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme

export function useTheme(newTheme: Theme = currentTheme): UseThemeResult {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('put usetheme inside themeProvider')
    }
    const { theme, setTheme } = context


    const toggleTheme = (theme: Theme) => {
        console.log(currentTheme, newTheme);

        setTheme(theme)
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    };
    return {
        theme,
        toggleTheme,
    };
}
