import { useInfiniteQuery } from "@tanstack/react-query";
import { getGameHistory } from "./history";

export const gameHistoryQueryOptions = {
    queryKey: ["gameHistory"],
    queryFn: ({ pageParam }: { pageParam: number }) => getGameHistory(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Awaited<ReturnType<typeof getGameHistory>>) => lastPage.nextPage,
};

export const useGameHistory = () => {
    return useInfiniteQuery(gameHistoryQueryOptions);
};
