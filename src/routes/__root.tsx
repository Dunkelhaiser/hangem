import { createRootRoute, Outlet } from "@tanstack/react-router";
import { initDb } from "@/db/client";
import { Toaster } from "@/ui/Toaster";

const LoadingScreen = () => (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center gap-3">
        <div className="border-orange-200 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-muted-foreground text-lg font-mono">Loading...</p>
    </main>
);

export const Route = createRootRoute({
    beforeLoad: async () => {
        await initDb();
    },
    pendingComponent: LoadingScreen,
    component: () => (
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
    ),
});
