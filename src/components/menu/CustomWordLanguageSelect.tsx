import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/Select";

const languageOptions = [
    { value: "en", label: "English" },
    { value: "uk", label: "Українська" },
] as const;

interface CustomWordLanguageSelectProps {
    value: string;
    onChange: (lang: string | null) => void;
}

export function CustomWordLanguageSelect({ value, onChange }: CustomWordLanguageSelectProps) {
    return (
        <Select value={value} onValueChange={onChange} items={languageOptions}>
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
}
