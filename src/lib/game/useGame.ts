import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { CurrentGame } from "@/db/schema";
import { type CustomWordPayload, isLatinChar } from "./customWordSchema";
import { generateWord } from "./generateWord";
import { clearCurrentGame, getCurrentGame, getPlayedCombinations, saveCurrentGame, saveGameToHistory } from "./history";

const MAX_ATTEMPTS = 6;

interface Options {
    initialWord?: CustomWordPayload;
    savedGame?: CurrentGame | null;
}

const isSavedGameMatch = (savedGame: CurrentGame | null | undefined, word: string, category: string) => {
    if (!savedGame) return false;
    return (
        savedGame.word.toLowerCase() === word.toLowerCase() &&
        savedGame.category.toLowerCase() === category.toLowerCase()
    );
};

export const useGame = ({ initialWord, savedGame }: Options = {}) => {
    const navigate = useNavigate();
    const [wordData, setWordData] = useState<{ word: string; category: string } | null>(() => {
        if (initialWord) {
            return { ...initialWord, category: initialWord.category ?? "Custom" };
        }
        if (savedGame) {
            return { word: savedGame.word, category: savedGame.category };
        }
        return generateWord();
    });
    const [guessedLetters, setGuessedLetters] = useState<string[]>(() => {
        if (initialWord) {
            const category = initialWord.category ?? "Custom";
            if (isSavedGameMatch(savedGame, initialWord.word, category)) {
                return savedGame?.guessedLetters ?? [];
            }
            return [];
        }
        return savedGame?.guessedLetters ?? [];
    });
    const savedRef = useRef(false);
    const playedCombinationsRef = useRef<Set<string> | null>(null);
    const isCustomWord = initialWord !== undefined;

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
            if (!isCustomWord) {
                clearCurrentGame();
            }
        }
    }, [isGameOver, isWin, word, category, guessedLetters, wordData, isCustomWord]);

    const handleNextWord = async () => {
        savedRef.current = false;

        if (isCustomWord) {
            const existingGame = await getCurrentGame();
            if (existingGame) {
                setWordData({ word: existingGame.word, category: existingGame.category });
                setGuessedLetters(existingGame.guessedLetters);
                navigate({ search: undefined });
                return;
            }
        }

        const newWord = generateWord(playedCombinationsRef.current ?? undefined);
        setWordData(newWord);
        setGuessedLetters([]);
        if (newWord) {
            saveCurrentGame(newWord.word, newWord.category, []);
        } else {
            clearCurrentGame();
        }
        navigate({ search: undefined });
    };

    const handleGuess = (letter: string) => {
        if (isGameOver || isWin) return;

        const lowerLetter = letter.toLowerCase();

        if (guessedLetters.includes(lowerLetter)) return;

        const newGuessedLetters = [...guessedLetters, lowerLetter];
        setGuessedLetters(newGuessedLetters);

        if (wordData) {
            saveCurrentGame(word, category, newGuessedLetters);
        }
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
