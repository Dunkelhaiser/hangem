import { useEffect, useState } from "react";
import { applyTheme, getTheme, THEME_KEY, type Theme } from "@/lib/theme";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/Select";

const themeOptions = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
] satisfies { value: Theme; label: string }[];

const ThemeSelect = () => {
    const [theme, setTheme] = useState<Theme>(getTheme);

    const handleThemeChange = (value: Theme | null) => {
        if (!value) return;
        setTheme(value);
        localStorage.setItem(THEME_KEY, value);
        applyTheme(value);
    };

    useEffect(() => {
        applyTheme(theme);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemChange = () => {
            if (theme === "system") applyTheme("system");
        };

        mediaQuery.addEventListener("change", handleSystemChange);
        return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }, [theme]);

    return (
        <Select value={theme} onValueChange={handleThemeChange} items={themeOptions}>
            <SelectTrigger className="w-28">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {themeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
export { ThemeSelect };
