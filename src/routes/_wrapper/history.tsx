import { createFileRoute } from "@tanstack/react-router";
import { BackNav } from "@/components/BackNav";
import EmptyHistory from "@/components/history/EmptyHistory";
import { HistoryCard } from "@/components/history/HistoryCard";
import { getGameHistory } from "@/lib/game/history";
import { ScrollArea } from "@/ui/ScrollArea";

export const Route = createFileRoute("/_wrapper/history")({
    component: History,
    loader: async () => {
        const history = await getGameHistory();
        return history;
    },
});

function History() {
    const history = Route.useLoaderData();

    return (
        <>
            <BackNav />
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center font-mono">Game History</h1>
                {history.length === 0 ? (
                    <EmptyHistory />
                ) : (
                    <ScrollArea className="h-[calc(100vh-9.738rem)]">
                        <div className="flex flex-col gap-4 pr-2">
                            {history.map((game) => (
                                <HistoryCard key={game.id} game={game} />
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </div>
        </>
    );
}
