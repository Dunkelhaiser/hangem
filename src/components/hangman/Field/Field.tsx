import { Letter } from "./Letter";

const word = "EXAMPLE";
const guessedLetters = ["E", "A", "M"];

const Field = () => {
    return (
        <div className="flex flex-wrap justify-center gap-y-4">
            {word.split("").map((char) => (
                <Letter
                    key={char}
                    letter={char}
                    variant={guessedLetters.includes(char.toUpperCase()) ? "guessed" : "hidden"}
                />
            ))}
        </div>
    );
};

export { Field };
