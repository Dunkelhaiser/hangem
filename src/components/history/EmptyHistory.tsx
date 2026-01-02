import { Link } from "@tanstack/react-router";
import { HistoryIcon } from "lucide-react";
import { Button } from "@/ui/Button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/ui/Empty";

const EmptyHistory = () => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <HistoryIcon />
                </EmptyMedia>
                <EmptyTitle>No History</EmptyTitle>
                <EmptyDescription>No games played yet</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button nativeButton={false} render={<Link to="/play" />}>
                    Play Now
                </Button>
            </EmptyContent>
        </Empty>
    );
};
export default EmptyHistory;
