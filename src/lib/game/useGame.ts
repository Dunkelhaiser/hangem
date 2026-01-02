import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { type CustomWordPayload, isLatinChar } from "./customWordSchema";
import { generateWord } from "./generateWord";
import { getPlayedCombinations, saveGameToHistory } from "./history";

const MAX_ATTEMPTS = 6;

interface Options {
    initialWord?: CustomWordPayload;
}

export const useGame = ({ initialWord }: Options = {}) => {
    const navigate = useNavigate();
    const [wordData, setWordData] = useState<{ word: string; category: string } | null>(() =>
        initialWord ? { ...initialWord, category: initialWord.category ?? "Custom" } : generateWord()
    );
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const savedRef = useRef(false);
    const playedCombinationsRef = useRef<Set<string> | null>(null);

    useEffect(() => {
        getPlayedCombinations().then((combinations) => {
            playedCombinationsRef.current = combinations;
        });
    }, []);

    const word = wordData?.word ?? "";
    const category = wordData?.category ?? "";
    const isExhausted = wordData === null;

    const wrongGuesses = guessedLetters.filter((letter) => !word.toLowerCase().includes(letter.toLowerCase()));
    const isGameOver = wrongGuesses.length >= MAX_ATTEMPTS;
    const isWin =
        word.length > 0 &&
        word
            .toLowerCase()
            .split("")
            .filter(isLatinChar)
            .every((letter) => guessedLetters.includes(letter.toLowerCase()));

    useEffect(() => {
        if ((isGameOver || isWin) && !savedRef.current && wordData) {
            savedRef.current = true;
            saveGameToHistory({
                word,
                category,
                guessedLetters,
                won: isWin,
            });
            const key = `${word.toLowerCase()}:${category.toLowerCase()}`;
            playedCombinationsRef.current?.add(key);
        }
    }, [isGameOver, isWin, word, category, guessedLetters, wordData]);

    const handleNextWord = () => {
        savedRef.current = false;
        setWordData(generateWord(playedCombinationsRef.current ?? undefined));
        setGuessedLetters([]);
        navigate({ search: undefined });
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
        isExhausted,
        handleNextWord,
        handleGuess,
    };
};
