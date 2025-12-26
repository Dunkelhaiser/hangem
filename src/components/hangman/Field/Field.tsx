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
            {word
                .split("")
                // biome-ignore lint/performance/useTopLevelRegex: doesn't run frequently
                .filter((char) => char === " " || /[a-z]/i.test(char))
                .map((char, index) =>
                    char === " " ? (
                        // biome-ignore lint/suspicious/noArrayIndexKey: index needed for duplicate spaces
                        <div key={index} className="w-6 sm:w-8" />
                    ) : (
                        // biome-ignore lint/suspicious/noArrayIndexKey: index needed for duplicate letters
                        <Letter key={index} letter={char} variant={getVariant(char)} />
                    )
                )}
        </div>
    );
};

export { Field };
