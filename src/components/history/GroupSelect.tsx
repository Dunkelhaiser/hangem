import type { Group } from "@/lib/history/history";
import { Route } from "@/routes/_wrapper/history";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/Select";

interface Props {
    value: Group;
}

const items = [
    { value: "all", label: "All" },
    { value: "won", label: "Won" },
    { value: "lost", label: "Lost" },
];

export const GroupSelect = ({ value }: Props) => {
    const navigate = Route.useNavigate();

    const handleChange = (newValue: Group | null) => {
        if (newValue) {
            navigate({ search: (prev) => ({ ...prev, group: newValue }) });
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
