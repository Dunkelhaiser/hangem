import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/Select";

const themeOptions = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
];

const ThemeSelect = () => {
    return (
        <Select defaultValue="system" items={themeOptions}>
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
