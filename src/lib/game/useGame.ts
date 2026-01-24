import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getLanguage } from "@/components/menu/Settings/LanguageSelect";
import type { CurrentGame } from "@/db/schema";
import { type Difficulty, getMaxAttempts } from "@/lib/difficulty";
import { clearCurrentGame, getCurrentGame, saveCurrentGame, saveGameToHistory } from "@/lib/history/history";
import { isValidChar } from "@/lib/languages/validators";
import type { CustomWordPayload } from "./customWordSchema";
import { generateWord } from "./generateWord";

interface Options {
    initialWord?: CustomWordPayload;
    savedGame?: CurrentGame | null;
    playedCombinations: Set<string>;
    difficulty: Difficulty;
}

const isSavedGameMatch = (savedGame: CurrentGame | null | undefined, word: string, category: string) => {
    if (!savedGame) return false;
    return (
        savedGame.word.toLowerCase() === word.toLowerCase() &&
        savedGame.category.toLowerCase() === category.toLowerCase()
    );
};

export const useGame = ({ initialWord, savedGame, playedCombinations, difficulty }: Options) => {
    const navigate = useNavigate();
    const maxAttempts = getMaxAttempts(difficulty);
    const [wordData, setWordData] = useState<{ word: string; category: string } | null>(() => {
        const language = getLanguage();
        if (initialWord) {
            return { ...initialWord, category: initialWord.category ?? "Custom" };
        }
        if (savedGame) {
            return { word: savedGame.word, category: savedGame.category };
        }
        return generateWord(playedCombinations, language);
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
    const playedCombinationsRef = useRef(playedCombinations);
    const isCustomWord = initialWord !== undefined;

    const word = wordData?.word ?? "";
    const category = wordData?.category ?? "";
    const isExhausted = wordData === null;

    const wrongGuesses = guessedLetters.filter((letter) => !word.toLowerCase().includes(letter.toLowerCase()));
    const isGameOver = wrongGuesses.length >= maxAttempts;

    const language = getLanguage();

    const isWin =
        word.length > 0 &&
        word
            .toLowerCase()
            .split("")
            .filter((char) => isValidChar(char, language))
            .every((letter) => guessedLetters.includes(letter.toLowerCase()));

    useEffect(() => {
        if ((isGameOver || isWin) && !savedRef.current && wordData) {
            if (isWin) toast.success("You've guessed the word!");
            else toast.error("You failed to guess the word");

            savedRef.current = true;
            saveGameToHistory({
                word,
                category,
                guessedLetters,
                won: isWin,
                difficulty,
                language,
            });
            const key = `${word.toLowerCase()}:${category.toLowerCase()}`;
            playedCombinationsRef.current?.add(key);
            if (!isCustomWord) {
                clearCurrentGame();
            }
        }
    }, [isGameOver, isWin, word, category, guessedLetters, wordData, isCustomWord, difficulty, language]);

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

        const language = getLanguage();
        const newWord = generateWord(playedCombinationsRef.current, language);
        setWordData(newWord);
        setGuessedLetters([]);
        if (newWord) {
            saveCurrentGame(newWord.word, newWord.category, language, []);
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
            saveCurrentGame(word, category, language, newGuessedLetters);
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
