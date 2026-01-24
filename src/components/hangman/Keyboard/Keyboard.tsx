import { useHotkeys } from "react-hotkeys-hook";
import { getLanguage } from "@/components/menu/Settings/LanguageSelect";
import { alphabets, type Language } from "@/lib/languages/alphabets";
import { isValidChar } from "@/lib/languages/validators";
import { Key } from "./Key";

interface Props {
    word: string;
    guessedLetters: string[];
    onGuess: (letter: string) => void;
    disabled: boolean;
    language?: Language;
}

const Keyboard = ({ word, guessedLetters, onGuess, disabled, language }: Props) => {
    const lang = language ?? getLanguage();
    const alphabet = alphabets[lang];

    useHotkeys(
        "*",
        (event) => {
            const key = event.key?.toLowerCase();
            if (key && isValidChar(key, lang) && !disabled && !guessedLetters.includes(key)) {
                onGuess(key);
            }
        },
        { enabled: !disabled },
        [guessedLetters, onGuess, disabled, lang]
    );

    const getKeyVariant = (letter: string) => {
        const lowerLetter = letter.toLowerCase();
        const isGuessed = guessedLetters.includes(lowerLetter);
        const isInWord = word.toLowerCase().includes(lowerLetter);

        switch (true) {
            case !isGuessed:
                return "idle";
            case isInWord:
                return "correct";
            default:
                return "wrong";
        }
    };

    return (
        <div className="flex flex-wrap justify-center max-w-lg gap-2.5">
            {alphabet.map((letter) => (
                <Key
                    letter={letter}
                    variant={getKeyVariant(letter)}
                    key={letter}
                    onClick={() => onGuess(letter)}
                    disabled={disabled || guessedLetters.includes(letter.toLowerCase())}
                />
            ))}
        </div>
    );
};

export { Keyboard };
