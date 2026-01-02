import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_wrapper")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <section className="px-2 pt-2 pb-8">
            <Outlet />
        </section>
    );
}
