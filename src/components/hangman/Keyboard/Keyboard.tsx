import { Key } from "./Key";

const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];

interface Props {
    word: string;
    guessedLetters: string[];
    onGuess: (letter: string) => void;
    disabled: boolean;
}

const Keyboard = ({ word, guessedLetters, onGuess, disabled }: Props) => {
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
