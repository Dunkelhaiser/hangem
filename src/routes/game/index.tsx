import { faker } from "@faker-js/faker";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Field } from "@/components/hangman/Field/Field";
import { Gallows } from "@/components/hangman/Gallows";
import { Keyboard } from "@/components/hangman/Keyboard/Keyboard";
import { Button } from "@/components/ui/Button";

export const Route = createFileRoute("/game/")({
    component: Game,
});

const generateWord = () => faker.word.sample({ length: { min: 3, max: 10 } });
const MAX_ATTEMPTS = 6;

function Game() {
    const [word, setWord] = useState(generateWord);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const wrongGuesses = guessedLetters.filter((letter) => !word.toLowerCase().includes(letter.toLowerCase()));
    const isGameOver = wrongGuesses.length >= MAX_ATTEMPTS;
    const isWin = word
        .toLowerCase()
        .split("")
        // biome-ignore lint/performance/useTopLevelRegex: doesn't run frequently
        .filter((char) => /[a-z]/i.test(char))
        .every((letter) => guessedLetters.includes(letter.toLowerCase()));

    const handleNextWord = () => {
        setWord(generateWord());
        setGuessedLetters([]);
    };

    const handleGuess = (letter: string) => {
        if (isGameOver || isWin) return;

        const lowerLetter = letter.toLowerCase();

        if (guessedLetters.includes(lowerLetter)) return;

        setGuessedLetters((prev) => [...prev, lowerLetter]);
    };

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
            <div className="flex flex-col gap-12 items-center">
                <Gallows stage={wrongGuesses.length} />
                <Field word={word} guessedLetters={guessedLetters} isGameOver={isGameOver} />
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
