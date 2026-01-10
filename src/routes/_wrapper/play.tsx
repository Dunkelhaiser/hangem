import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BackNav } from "@/components/BackNav";
import Congratulations from "@/components/hangman/Congratulations";
import { Field } from "@/components/hangman/Field/Field";
import { Gallows } from "@/components/hangman/Gallows";
import { Keyboard } from "@/components/hangman/Keyboard/Keyboard";
import { Button } from "@/components/ui/Button";
import { type Difficulty, getDifficulty } from "@/lib/difficulty";
import { customWordSearchQuerySchema } from "@/lib/game/customWordSchema";
import { decodeCustomWord } from "@/lib/game/encoding";
import { useGame } from "@/lib/game/useGame";
import { findExistingGame, getCurrentGame, getPlayedCombinations } from "@/lib/history/history";

export const Route = createFileRoute("/_wrapper/play")({
    component: Game,
    validateSearch: customWordSearchQuerySchema,
    loaderDeps: ({ search: { word } }) => ({ word }),
    loader: async ({ deps: { word: encodedWord } }) => {
        const [currentGame, playedCombinations] = await Promise.all([getCurrentGame(), getPlayedCombinations()]);

        if (!encodedWord) return { existingGame: null, currentGame, playedCombinations };

        const decoded = decodeCustomWord(encodedWord);
        if (!decoded?.word) return { existingGame: null, currentGame, playedCombinations };

        const existingGame = await findExistingGame(decoded.word, decoded.category);
        return { existingGame, currentGame, playedCombinations };
    },
});

function Game() {
    const { word: encodedWord } = Route.useSearch();
    const { existingGame, currentGame, playedCombinations } = Route.useLoaderData();
    const navigate = Route.useNavigate();
    const [difficulty] = useState<Difficulty>(getDifficulty);

    const initialWord = encodedWord ? decodeCustomWord(encodedWord) : null;

    if (encodedWord && !initialWord?.word) {
        navigate({ search: undefined });
    }

    const {
        word,
        category,
        guessedLetters,
        wrongGuesses,
        isGameOver,
        isWin,
        isExhausted,
        handleNextWord,
        handleGuess,
    } = useGame({
        initialWord: initialWord || undefined,
        savedGame: currentGame,
        playedCombinations,
        difficulty,
    });

    if (isExhausted && initialWord === null) {
        return (
            <>
                <BackNav />
                <Congratulations />
            </>
        );
    }

    const isAlreadyCompleted = existingGame !== null;
    const displayWord = existingGame?.word ?? word;
    const displayCategory = existingGame?.category ?? category;
    const displayGuessedLetters = existingGame?.guessedLetters ?? guessedLetters;
    const displayWrongGuesses = existingGame
        ? existingGame.guessedLetters.filter((letter) => !existingGame.word.toLowerCase().includes(letter))
        : wrongGuesses;
    const displayIsGameOver = isAlreadyCompleted || isGameOver;
    const isDisabled = isAlreadyCompleted || isGameOver || isWin;

    return (
        <>
            <BackNav>
                <Button size="sm" onClick={handleNextWord} variant="secondary" disabled={!isDisabled}>
                    Next Word
                </Button>
            </BackNav>
            <div className="flex flex-col gap-8 items-center">
                <Gallows stage={displayWrongGuesses.length} difficulty={difficulty} />
                <div className="flex flex-col items-center gap-4">
                    <p className="text-muted-foreground text-sm">
                        Category: <span className="font-semibold text-foreground capitalize">{displayCategory}</span>
                    </p>
                    <Field word={displayWord} guessedLetters={displayGuessedLetters} isGameOver={displayIsGameOver} />
                </div>
                <Keyboard
                    word={displayWord}
                    guessedLetters={displayGuessedLetters}
                    onGuess={isAlreadyCompleted ? () => undefined : handleGuess}
                    disabled={isDisabled}
                />
            </div>
        </>
    );
}
