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

    const words = word.split(" ");

    return (
        <div className="flex flex-wrap justify-center gap-y-4 gap-x-6 sm:gap-x-8 max-w-full">
            {words.map((word, wordIndex) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: index needed for duplicate words
                <div key={wordIndex} className="flex flex-wrap justify-center max-w-full gap-y-2">
                    {word
                        .split("")
                        // biome-ignore lint/performance/useTopLevelRegex: doesn't run frequently
                        .filter((char) => /[a-z]/i.test(char))
                        .map((char, charIndex) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: index needed for duplicate letters
                            <Letter key={charIndex} letter={char} variant={getVariant(char)} />
                        ))}
                </div>
            ))}
        </div>
    );
};

export { Field };
