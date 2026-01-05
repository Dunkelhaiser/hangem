export type Theme = "light" | "dark" | "system";

export const THEME_KEY = "theme";

export const getTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
        return stored;
    }
    return "system";
};

const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const applyTheme = (theme: Theme) => {
    const resolvedTheme = theme === "system" ? getSystemTheme() : theme;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
};
