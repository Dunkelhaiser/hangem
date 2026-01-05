import { createFileRoute, Link } from "@tanstack/react-router";
import { GameModeDialog } from "@/components/menu/GameModeDialog";
import { InstructionsDialog } from "@/components/menu/InstructionsDialog";
import { SettingsDialog } from "@/components/menu/Settings/SettingsDialog";
import { getSearchFilters } from "@/lib/history/historyHooks";
import { Button } from "@/ui/Button";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen p-4 gap-16">
            <h1 className="text-6xl font-bold tracking-tighter text-foreground font-mono">Hangem</h1>
            <nav className="flex flex-col w-full max-w-xs gap-4">
                <GameModeDialog trigger={<Button size="lg">Play</Button>} />
                <Button
                    variant="outline"
                    size="lg"
                    nativeButton={false}
                    render={
                        <Link
                            to="/history"
                            search={{ sortBy: "date", order: "desc", group: "all", ...getSearchFilters() }}
                        />
                    }
                >
                    History
                </Button>
                <SettingsDialog
                    trigger={
                        <Button variant="outline" size="lg">
                            Settings
                        </Button>
                    }
                />
                <InstructionsDialog
                    trigger={
                        <Button variant="outline" size="lg">
                            Instructions
                        </Button>
                    }
                />
            </nav>
        </section>
    );
}
