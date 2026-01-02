import { useEffect, useRef, useState } from "react";
import { type CustomWordPayload, isLatinChar } from "./customWordSchema";
import { generateWord } from "./generateWord";
import { saveGameToHistory } from "./history";

const MAX_ATTEMPTS = 6;

interface Options {
    initialWord?: CustomWordPayload;
}

export const useGame = ({ initialWord }: Options = {}) => {
    const [{ word, category }, setWordData] = useState(() =>
        initialWord ? { ...initialWord, category: initialWord.category ?? "Custom" } : generateWord()
    );
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const savedRef = useRef(false);

    const wrongGuesses = guessedLetters.filter((letter) => !word.toLowerCase().includes(letter.toLowerCase()));
    const isGameOver = wrongGuesses.length >= MAX_ATTEMPTS;
    const isWin = word
        .toLowerCase()
        .split("")
        .filter(isLatinChar)
        .every((letter) => guessedLetters.includes(letter.toLowerCase()));

    useEffect(() => {
        if ((isGameOver || isWin) && !savedRef.current) {
            savedRef.current = true;
            saveGameToHistory({
                word,
                category,
                guessedLetters,
                won: isWin,
            });
        }
    }, [isGameOver, isWin, word, category, guessedLetters]);

    const handleNextWord = () => {
        savedRef.current = false;
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
