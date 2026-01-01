import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/ui/Toaster";

export const Route = createRootRoute({
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
