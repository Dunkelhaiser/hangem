export type Difficulty = "normal" | "easy";

export const DIFFICULTY_KEY = "difficulty";

export const getDifficulty = () => {
    const stored = localStorage.getItem(DIFFICULTY_KEY);

    if (stored === "normal" || stored === "easy") {
        return stored;
    }

    return "normal";
};

export const setDifficulty = (difficulty: Difficulty) => {
    localStorage.setItem(DIFFICULTY_KEY, difficulty);
};

export const EASY_MODE_GALLOWS_PARTS = 6;
export const HANGMAN_PARTS = 6;
export const MAX_ATTEMPTS_EASY = EASY_MODE_GALLOWS_PARTS + HANGMAN_PARTS;
export const MAX_ATTEMPTS_NORMAL = HANGMAN_PARTS;

export const getMaxAttempts = (difficulty: Difficulty) => {
    return difficulty === "easy" ? MAX_ATTEMPTS_EASY : MAX_ATTEMPTS_NORMAL;
};
