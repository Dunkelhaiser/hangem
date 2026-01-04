import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { BackNav } from "@/components/BackNav";
import EmptyHistory from "@/components/history/EmptyHistory";
import { HistoryCard } from "@/components/history/HistoryCard";
import { gameHistoryQueryOptions, useGameHistory } from "@/lib/game/historyHooks";
import { ScrollArea } from "@/ui/ScrollArea";
import Spinner from "@/ui/Spinner";

export const Route = createFileRoute("/_wrapper/history")({
    component: History,
    // @ts-expect-error types not updating, works at runtime
    loader: ({ context }) => context.queryClient.prefetchInfiniteQuery(gameHistoryQueryOptions),
});

function History() {
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGameHistory();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = loadMoreRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const history = data?.pages.flatMap((page) => page.data) ?? [];

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
                            <div ref={loadMoreRef} className="h-1" />
                            {isFetchingNextPage && <Spinner className="mx-auto" />}
                        </div>
                    </ScrollArea>
                )}
            </div>
        </>
    );
}
