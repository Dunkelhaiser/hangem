import { createFileRoute } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { BackNav } from "@/components/BackNav";
import EmptyHistory from "@/components/history/EmptyHistory";
import { GroupSelect } from "@/components/history/GroupSelect";
import { HistoryCard } from "@/components/history/HistoryCard";
import { SortBySelect } from "@/components/history/SortBySelect";
import { SortOrderButton } from "@/components/history/SortOrderButton";
import { historySortSchema } from "@/lib/history/history";
import { getGameHistoryQueryOptions, useGameHistory } from "@/lib/history/historyHooks";
import { ScrollArea } from "@/ui/ScrollArea";
import Spinner from "@/ui/Spinner";

const ESTIMATED_CARD_HEIGHT = 140;

export const Route = createFileRoute("/_wrapper/history")({
    component: History,
    validateSearch: historySortSchema,
    loaderDeps: ({ search: { order, sortBy, group } }) => ({ sortBy, order, group }),
    loader: ({ context, deps: { sortBy, order, group } }) =>
        // @ts-expect-error types not updating, works at runtime
        context.queryClient.prefetchInfiniteQuery(getGameHistoryQueryOptions({ sortBy, order, group })),
});

function History() {
    const parentRef = useRef<HTMLDivElement>(null);
    const { sortBy, order, group } = Route.useSearch();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGameHistory({ sortBy, order, group });

    const history = data?.pages.flatMap((page) => page.data) ?? [];

    const virtualizer = useVirtualizer({
        count: history.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => ESTIMATED_CARD_HEIGHT,
        gap: 16,
        overscan: 5,
    });

    const virtualItems = virtualizer.getVirtualItems();

    useEffect(() => {
        const lastItem = virtualItems.at(-1);
        if (!lastItem) return;

        if (lastItem.index >= history.length - 1 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [virtualItems, history.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <>
            <BackNav>
                <div className="flex justify-end gap-2">
                    <GroupSelect value={group} />
                    <SortBySelect value={sortBy} />
                    <SortOrderButton sortBy={sortBy} order={order} />
                </div>
            </BackNav>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center font-mono">Game History</h1>
                {history.length === 0 ? (
                    <EmptyHistory />
                ) : (
                    <ScrollArea viewportRef={parentRef} className="h-[calc(100vh-9.738rem)]">
                        <div className="relative w-full" style={{ height: `${virtualizer.getTotalSize()}px` }}>
                            {virtualItems.map((virtualItem) => (
                                <div
                                    key={virtualItem.key}
                                    className="absolute top-0 left-0 w-full pr-2"
                                    style={{
                                        height: `${virtualItem.size}px`,
                                        transform: `translateY(${virtualItem.start}px)`,
                                    }}
                                >
                                    <HistoryCard game={history[virtualItem.index]} />
                                </div>
                            ))}
                        </div>
                        {isFetchingNextPage && <Spinner className="mx-auto my-4" />}
                    </ScrollArea>
                )}
            </div>
        </>
    );
}
