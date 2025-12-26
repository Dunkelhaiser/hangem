import { createFileRoute } from "@tanstack/react-router";
import { Keyboard } from "@/components/hangman/Keyboard/Keyboard";

export const Route = createFileRoute("/game/")({
    component: Game,
});

function Game() {
    return <Keyboard />;
}
