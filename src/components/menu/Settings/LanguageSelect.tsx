import { useEffect, useState } from "react";
import { clearCurrentGame } from "@/lib/history/history";
import type { Language } from "@/lib/languages/alphabets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/Select";

export const LANGUAGE_KEY = "game_language";

const languageOptions = [
    { value: "en", label: "English" },
    { value: "uk", label: "Українська" },
] as const;

export function getLanguage() {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem(LANGUAGE_KEY) as Language) || "en";
}

export function setLanguage(lang: Language) {
    localStorage.setItem(LANGUAGE_KEY, lang);
}

const LanguageSelect = () => {
    const [language, setLanguageState] = useState<Language>(getLanguage);

    const handleLanguageChange = async (value: Language | null) => {
        if (!value) return;
        setLanguageState(value);
        setLanguage(value);
        await clearCurrentGame();
    };

    useEffect(() => {
        setLanguage(language);
    }, [language]);

    return (
        <Select value={language} onValueChange={handleLanguageChange} items={languageOptions}>
            <SelectTrigger className="w-32">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export { LanguageSelect };
