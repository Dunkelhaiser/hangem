import { Letter } from "./Letter";

interface Props {
    word: string;
    guessedLetters: string[];
    isGameOver: boolean;
}

const Field = ({ word, guessedLetters, isGameOver }: Props) => {
    const getVariant = (char: string) => {
        const isGuessed = guessedLetters.includes(char.toLowerCase());

        switch (true) {
            case isGuessed:
                return "guessed";
            case isGameOver:
                return "reveal";
            default:
                return "hidden";
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-y-4">
            {word.split("").map((char, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: index needed for duplicate letters
                <Letter key={index} letter={char} variant={getVariant(char)} />
            ))}
        </div>
    );
};

export { Field };
