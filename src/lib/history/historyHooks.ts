import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getLocalStorage, saveLocalStorage } from "@/lib/utils";
import { Route } from "@/routes/_wrapper/history";
import { exportGameHistory, getGameHistory, type HistorySort } from "./history";

export const getGameHistoryQueryOptions = ({ sortBy, order, group }: HistorySort) => ({
    queryKey: ["gameHistory", sortBy, order, group],
    queryFn: ({ pageParam }: { pageParam: number }) => getGameHistory(pageParam, 10, { sortBy, order, group }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Awaited<ReturnType<typeof getGameHistory>>) => lastPage.nextPage,
});

export const useGameHistory = ({ sortBy, order, group }: HistorySort) => {
    return useInfiniteQuery(getGameHistoryQueryOptions({ sortBy, order, group }));
};

export const HISTORY_SEARCH_PARAMS_KEY = "history-filter";

export const getSearchFilters = () => getLocalStorage<Partial<HistorySort>>(HISTORY_SEARCH_PARAMS_KEY);
const saveSearchFilters = (params: Partial<HistorySort>) =>
    saveLocalStorage<HistorySort>(HISTORY_SEARCH_PARAMS_KEY, params);

export const useUpdateSearchFilters = () => {
    const navigate = Route.useNavigate();
    return (params: Partial<HistorySort>) => {
        saveSearchFilters(params);
        navigate({ search: (prev) => ({ ...prev, ...params }) });
    };
};

export const useExportHistory = () => {
    return useMutation({
        mutationFn: async () => {
            await exportGameHistory();
            toast.success("Game history exported successfully");
        },
    });
};
