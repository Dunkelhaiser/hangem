import type { SortBy } from "@/lib/history/history";
import { Route } from "@/routes/_wrapper/history";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/Select";

interface Props {
    value: SortBy;
}

const items = [
    { value: "date", label: "Date" },
    { value: "word", label: "Word" },
];

export const SortBySelect = ({ value }: Props) => {
    const navigate = Route.useNavigate();

    const handleChange = (newValue: SortBy | null) => {
        if (newValue) {
            navigate({ search: (prev) => ({ ...prev, sortBy: newValue }) });
        }
    };

    return (
        <Select value={value} onValueChange={handleChange} items={items}>
            <SelectTrigger size="sm">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
