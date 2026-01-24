import type { Language } from "@/lib/languages/alphabets";
import { words } from "@/lib/languages/words";

const categories = [
    "animal",
    "month",
    "day",
    "vegetable",
    "fruit",
    "spice",
    "country",
    "continent",
    "direction",
    "unit",
    "element",
    "color",
    "music",
    "job",
    "vehicle",
    "adjective",
] as const;

const MAX_ATTEMPTS = 100;

const getRandomElement = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];

export const generateWord = (playedCombinations?: Set<string>, language: Language = "en") => {
    const languageWords = words[language];

    const availableCategories = categories.filter(
        (category) => languageWords[category] && languageWords[category].length > 0
    );

    if (availableCategories.length === 0) {
        return null;
    }

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const category = getRandomElement(availableCategories);
        const wordArray = languageWords[category];

        if (!wordArray || wordArray.length === 0) {
            continue;
        }

        const word = getRandomElement(wordArray);
        const key = `${word.toLowerCase()}:${category.toLowerCase()}`;

        if (!playedCombinations?.has(key)) {
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            return { word, category: categoryName };
        }
    }

    return null;
};
