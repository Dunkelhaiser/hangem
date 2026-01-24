import { z as zod } from "zod";
import type { Language } from "./alphabets";

const enRegex = /^[a-z]$/i;
const ukRegex = /^[а-щьюяґєії]$/i;
const allAlphabetsRegex = new RegExp(`^(${enRegex.source}|${ukRegex.source})$`, "i");

const isEnglishChar = (char: string) => zod.string().regex(enRegex).safeParse(char).success;
const isUkrainianChar = (char: string) => zod.string().regex(ukRegex).safeParse(char).success;
const isAllAlphabetsChar = (char: string) => zod.string().regex(allAlphabetsRegex).safeParse(char).success;

export const isValidChar = (char: string, language?: Language, allowSpaces?: boolean) => {
    if (allowSpaces && char === " ") return true;

    switch (language) {
        case "en":
            return isEnglishChar(char);
        case "uk":
            return isUkrainianChar(char);
        default:
            return isAllAlphabetsChar(char);
    }
};
