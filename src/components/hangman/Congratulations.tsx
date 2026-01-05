import { Link } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { getSearchFilters } from "@/lib/history/historyHooks";
import { Button } from "@/ui/Button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/ui/Empty";

const Congratulations = () => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Trophy />
                </EmptyMedia>
                <EmptyTitle>Congratulations!</EmptyTitle>
                <EmptyDescription>You've played all available words! Check back later for more.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button
                    variant="secondary"
                    nativeButton={false}
                    render={
                        <Link
                            to="/history"
                            search={{ sortBy: "date", order: "desc", group: "all", ...getSearchFilters() }}
                        />
                    }
                >
                    View History
                </Button>
            </EmptyContent>
        </Empty>
    );
};
export default Congratulations;
