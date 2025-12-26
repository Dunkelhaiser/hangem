import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: () => (
        <main className="bg-background min-h-screen">
            <Outlet />
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
