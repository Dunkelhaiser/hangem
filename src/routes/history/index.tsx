import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { HistoryCard } from "@/components/HistoryCard";
import { Button } from "@/components/ui/Button";
import { getGameHistory } from "@/lib/game/history";

export const Route = createFileRoute("/history/")({
    component: History,
    loader: async () => {
        const history = await getGameHistory();
        return history;
    },
});

function History() {
    const history = Route.useLoaderData();

    return (
        <section className="px-2 pt-2 pb-8">
            <div className="flex items-center mb-6 justify-between max-w-3xl mx-auto">
                <Button variant="link" size="sm" nativeButton={false} render={<Link to="/" />}>
                    <ArrowLeft className="size-4" />
                    Back
                </Button>
            </div>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Game History</h1>
                {history.length === 0 ? (
                    <p className="text-center text-muted-foreground">No games played yet.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {history.map((game) => (
                            <HistoryCard key={game.id} game={game} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
