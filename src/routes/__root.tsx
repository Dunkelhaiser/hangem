import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useLoadingBar } from "react-top-loading-bar";
import { initDb } from "@/db/client";
import Spinner from "@/ui/Spinner";
import { Toaster } from "@/ui/Toaster";

const LoadingScreen = () => (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center gap-3">
        <Spinner size="lg" />
        <p className="text-muted-foreground text-lg font-mono">Loading...</p>
    </main>
);

export const Route = createRootRoute({
    beforeLoad: async () => {
        await initDb();
    },
    pendingComponent: LoadingScreen,
    component: () => {
        const routerState = useRouterState();
        const { start, complete } = useLoadingBar();

        useEffect(() => {
            if (routerState.isLoading) {
                start();
            } else {
                complete();
            }
        }, [routerState.isLoading, start, complete]);

        return (
            <main className="bg-background min-h-screen">
                <Outlet />
                <Toaster />
                {/* <TanStackDevtools
                config={{
                    position: "bottom-right",
                }}
                plugins={[
                    {
                        name: "Tanstack Router",
                        render: <TanStackRouterDevtoolsPanel />,
                    },
                ]}
            /> */}
            </main>
        );
    },
});
