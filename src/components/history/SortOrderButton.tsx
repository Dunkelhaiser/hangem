import { ArrowDownAZ, ArrowDownZA, CalendarArrowDown, CalendarArrowUp } from "lucide-react";
import type { Order, SortBy } from "@/lib/game/history";
import { Route } from "@/routes/_wrapper/history";
import { Button } from "@/ui/Button";

interface Props {
    sortBy: SortBy;
    order: Order;
}

export const SortOrderButton = ({ sortBy, order }: Props) => {
    const navigate = Route.useNavigate();

    const handleClick = () => {
        navigate({ search: (prev) => ({ ...prev, order: order === "asc" ? "desc" : "asc" }) });
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
