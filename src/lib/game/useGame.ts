import { useState } from "react";
import { isLatinChar } from "./customWordSchema";
import { generateWord, type WordData } from "./generateWord";

const MAX_ATTEMPTS = 6;

interface Options {
    initialWord?: WordData;
}

export const useGame = (options: Options = {}) => {
    const [{ word, category }, setWordData] = useState(() => options.initialWord ?? generateWord());
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const wrongGuesses = guessedLetters.filter((letter) => !word.toLowerCase().includes(letter.toLowerCase()));
    const isGameOver = wrongGuesses.length >= MAX_ATTEMPTS;
    const isWin = word
        .toLowerCase()
        .split("")
        .filter(isLatinChar)
        .every((letter) => guessedLetters.includes(letter.toLowerCase()));

    const handleNextWord = () => {
        setWordData(generateWord());
        setGuessedLetters([]);
    };

    const handleGuess = (letter: string) => {
        if (isGameOver || isWin) return;

        const lowerLetter = letter.toLowerCase();

        if (guessedLetters.includes(lowerLetter)) return;

        setGuessedLetters((prev) => [...prev, lowerLetter]);
    };

    return {
        word,
        category,
        guessedLetters,
        wrongGuesses,
        isGameOver,
        isWin,
        handleNextWord,
        handleGuess,
    };
};
