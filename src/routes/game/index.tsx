import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Field } from "@/components/hangman/Field/Field";
import { Gallows } from "@/components/hangman/Gallows";
import { Keyboard } from "@/components/hangman/Keyboard/Keyboard";
import { Button } from "@/components/ui/Button";
import { useGame } from "@/lib/game/useGame";

export const Route = createFileRoute("/game/")({
    component: Game,
});

function Game() {
    const { word, category, guessedLetters, wrongGuesses, isGameOver, isWin, handleNextWord, handleGuess } = useGame();

    return (
        <section className="px-2 pt-2 pb-8">
            <div className="flex items-center mb-6 justify-between max-w-3xl mx-auto">
                <Button variant="link" size="sm" className="gap-1" nativeButton={false} render={<Link to="/" />}>
                    <ArrowLeft className="size-4" />
                    Back
                </Button>
                <Button size="sm" onClick={handleNextWord} variant="secondary" disabled={!(isGameOver || isWin)}>
                    Next Word
                </Button>
            </div>
            <div className="flex flex-col gap-8 items-center">
                <Gallows stage={wrongGuesses.length} />
                <div className="flex flex-col items-center gap-4">
                    <p className="text-muted-foreground text-sm">
                        Category: <span className="font-semibold text-foreground">{category}</span>
                    </p>
                    <Field word={word} guessedLetters={guessedLetters} isGameOver={isGameOver} />
                </div>
                <Keyboard
                    word={word}
                    guessedLetters={guessedLetters}
                    onGuess={handleGuess}
                    disabled={isGameOver || isWin}
                />
            </div>
        </section>
    );
}
