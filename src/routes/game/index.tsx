import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Field } from "@/components/hangman/Field/Field";
import { Keyboard } from "@/components/hangman/Keyboard/Keyboard";

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
        <div className="flex flex-col gap-12 items-center px-2 py-8">
            <p className="text-lg font-medium">Attempts remaining: {MAX_ATTEMPTS - wrongGuesses.length}</p>
            <Field word={WORD} guessedLetters={guessedLetters} isGameOver={isGameOver} />
            <Keyboard
                word={WORD}
                guessedLetters={guessedLetters}
                onGuess={handleGuess}
                disabled={isGameOver || isWin}
            />
        </div>
    );
}
