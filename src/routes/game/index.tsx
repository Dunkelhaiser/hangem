import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useCallback, useState } from "react";
import { Field } from "@/components/hangman/Field/Field";
import { Gallows } from "@/components/hangman/Gallows";
import { Keyboard } from "@/components/hangman/Keyboard/Keyboard";
import { Button } from "@/components/ui/Button";

export const Route = createFileRoute("/game/")({
    component: Game,
});

const WORD = "Democratic People's Republic of Korea";
const MAX_ATTEMPTS = 6;

function Game() {
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const wrongGuesses = guessedLetters.filter((letter) => !WORD.toLowerCase().includes(letter.toLowerCase()));
    const isGameOver = wrongGuesses.length >= MAX_ATTEMPTS;
    const isWin = WORD.toLowerCase()
        .split("")
        // biome-ignore lint/performance/useTopLevelRegex: doesn't run frequently
        .filter((char) => /[a-z]/i.test(char))
        .every((letter) => guessedLetters.includes(letter.toLowerCase()));

    const handleGuess = useCallback(
        (letter: string) => {
            if (isGameOver || isWin) return;

            const lowerLetter = letter.toLowerCase();

            if (guessedLetters.includes(lowerLetter)) return;

            setGuessedLetters((prev) => [...prev, lowerLetter]);
        },
        [guessedLetters, isGameOver, isWin]
    );

    return (
        <section className="px-2 pt-2 pb-8">
            <Button variant="link" size="sm" className="gap-1 mb-2" nativeButton={false} render={<Link to="/" />}>
                <ArrowLeft className="size-4" />
                Back
            </Button>
            <div className="flex flex-col gap-12 items-center">
                <Gallows stage={wrongGuesses.length} />
                <Field word={WORD} guessedLetters={guessedLetters} isGameOver={isGameOver} />
                <Keyboard
                    word={WORD}
                    guessedLetters={guessedLetters}
                    onGuess={handleGuess}
                    disabled={isGameOver || isWin}
                />
            </div>
        </section>
    );
}
