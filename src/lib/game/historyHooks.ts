import { useInfiniteQuery } from "@tanstack/react-query";
import { getGameHistory, type HistorySort } from "./history";

export const getGameHistoryQueryOptions = ({ sortBy, order }: HistorySort) => ({
    queryKey: ["gameHistory", sortBy, order],
    queryFn: ({ pageParam }: { pageParam: number }) => getGameHistory(pageParam, 10, { sortBy, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Awaited<ReturnType<typeof getGameHistory>>) => lastPage.nextPage,
});

export const useGameHistory = ({ sortBy, order }: HistorySort) => {
    return useInfiniteQuery(getGameHistoryQueryOptions({ sortBy, order }));
};
