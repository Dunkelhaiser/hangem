import { useInfiniteQuery } from "@tanstack/react-query";
import { getGameHistory, type HistorySort } from "./history";

export const getGameHistoryQueryOptions = ({ sortBy, order, group }: HistorySort) => ({
    queryKey: ["gameHistory", sortBy, order, group],
    queryFn: ({ pageParam }: { pageParam: number }) => getGameHistory(pageParam, 10, { sortBy, order, group }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Awaited<ReturnType<typeof getGameHistory>>) => lastPage.nextPage,
});

export const useGameHistory = ({ sortBy, order, group }: HistorySort) => {
    return useInfiniteQuery(getGameHistoryQueryOptions({ sortBy, order, group }));
};
