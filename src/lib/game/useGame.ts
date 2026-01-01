import { useState } from "react";
import { generateWord } from "./generateWord";

const MAX_ATTEMPTS = 6;

export const useGame = () => {
    const [{ word, category }, setWordData] = useState(generateWord);
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
