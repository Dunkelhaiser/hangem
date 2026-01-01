import { faker } from "@faker-js/faker";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Field } from "@/components/hangman/Field/Field";
import { Gallows } from "@/components/hangman/Gallows";
import { Keyboard } from "@/components/hangman/Keyboard/Keyboard";
import { Button } from "@/components/ui/Button";

export const Route = createFileRoute("/game/")({
    component: Game,
});

const categories = [
    { name: "Animal", generator: () => faker.animal.type() },
    { name: "Product", generator: () => faker.commerce.product() },
    { name: "Month", generator: () => faker.date.month() },
    { name: "Day", generator: () => faker.date.weekday() },
    { name: "Vegetable", generator: () => faker.food.vegetable() },
    { name: "Fruit", generator: () => faker.food.fruit() },
    { name: "Ingredient", generator: () => faker.food.ingredient() },
    { name: "Spice", generator: () => faker.food.spice() },
    { name: "Country", generator: () => faker.location.country() },
    { name: "Continent", generator: () => faker.location.continent() },
    { name: "Direction", generator: () => faker.location.direction() },
    { name: "Unit", generator: () => faker.science.unit().name },
    { name: "Element", generator: () => faker.science.chemicalElement().name },
    { name: "Color", generator: () => faker.color.human() },
    { name: "Music", generator: () => faker.music.genre() },
    { name: "Job", generator: () => faker.person.jobType() },
    { name: "Vehicle", generator: () => faker.vehicle.type() },
    { name: "Adjective", generator: () => faker.word.adjective() },
] as const;

const generateWord = () => {
    const category = faker.helpers.arrayElement(categories);
    return { word: category.generator(), category: category.name };
};
const MAX_ATTEMPTS = 6;

function Game() {
    const [{ word, category }, setWordData] = useState(generateWord);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const wrongGuesses = guessedLetters.filter((letter) => !word.toLowerCase().includes(letter.toLowerCase()));
    const isGameOver = wrongGuesses.length >= MAX_ATTEMPTS;
    const isWin = word
        .toLowerCase()
        .split("")
        // biome-ignore lint/performance/useTopLevelRegex: doesn't run frequently
        .filter((char) => /[a-z]/i.test(char))
        .every((letter) => guessedLetters.includes(letter.toLowerCase()));

    const handleNextWord = () => {
        setWordData(generateWord());
        setGuessedLetters([]);
    };

    const handleGuess = (letter: string) => {
        if (isGameOver || isWin) return;

        const lowerLetter = letter.toLowerCase();

        if (guessedLetters.includes(lowerLetter)) return;

        setGuessedLetters((prev) => [...prev, lowerLetter]);
    };

    return (
        <section className="px-2 pt-2 pb-8">
            <div className="flex items-center mb-6 justify-between max-w-3xl mx-auto">
                <Button variant="link" size="sm" className="gap-1" nativeButton={false} render={<Link to="/" />}>
                    <ArrowLeft className="size-4" />
                    Back
                </Button>
                <Button size="sm" onClick={handleNextWord} variant="secondary" disabled={!(isGameOver || isWin)}>
                    Next Word
                </Button>
            </div>
            <div className="flex flex-col gap-8 items-center">
                <Gallows stage={wrongGuesses.length} />
                <div className="flex flex-col items-center gap-4">
                    <p className="text-muted-foreground text-sm">
                        Category: <span className="font-semibold text-foreground">{category}</span>
                    </p>
                    <Field word={word} guessedLetters={guessedLetters} isGameOver={isGameOver} />
                </div>
                <Keyboard
                    word={word}
                    guessedLetters={guessedLetters}
                    onGuess={handleGuess}
                    disabled={isGameOver || isWin}
                />
            </div>
        </section>
    );
}
