import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDom from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "./styles.css";
import { LoadingBarContainer } from "react-top-loading-bar";

const queryClient = new QueryClient();

const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
    const root = ReactDom.createRoot(rootElement);
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <LoadingBarContainer
                    props={{
                        color: "#ffd6a7",
                        height: 3,
                        shadow: false,
                        waitingTime: 400,
                    }}
                >
                    <RouterProvider router={router} />
                </LoadingBarContainer>
            </QueryClientProvider>
        </StrictMode>
    );
}
