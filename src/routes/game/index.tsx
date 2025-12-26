import { createFileRoute } from "@tanstack/react-router";
import { Field } from "@/components/hangman/Field/Field";
import { Keyboard } from "@/components/hangman/Keyboard/Keyboard";

export const Route = createFileRoute("/game/")({
    component: Game,
});

function Game() {
    return (
        <div className="flex flex-col gap-12 items-center px-2 py-8">
            <Field />
            <Keyboard />
        </div>
    );
}
