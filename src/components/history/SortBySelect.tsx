import type { SortBy } from "@/lib/history/history";
import { useUpdateSearchFilters } from "@/lib/history/historyHooks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/Select";

interface Props {
    value: SortBy;
}

const items = [
    { value: "date", label: "Date" },
    { value: "word", label: "Word" },
];

export const SortBySelect = ({ value }: Props) => {
    const updateSearchParams = useUpdateSearchFilters();

    const handleChange = (newValue: SortBy | null) => {
        if (newValue) {
            updateSearchParams({ sortBy: newValue });
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
