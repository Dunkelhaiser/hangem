import { ArrowDownAZ, ArrowDownZA, CalendarArrowDown, CalendarArrowUp } from "lucide-react";
import type { Order, SortBy } from "@/lib/history/history";
import { useUpdateSearchFilters } from "@/lib/history/historyHooks";
import { Button } from "@/ui/Button";

interface Props {
    sortBy: SortBy;
    order: Order;
}

export const SortOrderButton = ({ sortBy, order }: Props) => {
    const updateSearchParams = useUpdateSearchFilters();

    const handleClick = () => {
        updateSearchParams({ order: order === "asc" ? "desc" : "asc" });
    };

    const getSortIcon = () => {
        if (sortBy === "date") {
            return order === "desc" ? CalendarArrowDown : CalendarArrowUp;
        }
        return order === "desc" ? ArrowDownZA : ArrowDownAZ;
    };

    const SortIcon = getSortIcon();

    return (
        <Button variant="outline" size="icon-sm" onClick={handleClick}>
            <SortIcon className="size-4" />
        </Button>
    );
};
