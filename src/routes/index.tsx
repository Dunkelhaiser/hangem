import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen p-4 gap-16">
            <h1 className="text-6xl font-bold tracking-tighter text-foreground">Hangem</h1>
            <nav className="flex flex-col w-full max-w-xs gap-4">
                <Button size="lg">Play</Button>
                <Button variant="outline" size="lg">
                    History
                </Button>
                <Button variant="outline" size="lg">
                    Settings
                </Button>
                <Button variant="outline" size="lg">
                    Instructions
                </Button>
            </nav>
        </section>
    );
}
