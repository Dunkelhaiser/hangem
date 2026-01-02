import { createFileRoute } from "@tanstack/react-router";
import { BackNav } from "@/components/BackNav";
import { Field } from "@/components/hangman/Field/Field";
import { Gallows } from "@/components/hangman/Gallows";
import { Keyboard } from "@/components/hangman/Keyboard/Keyboard";
import { Button } from "@/components/ui/Button";
import { customWordSearchQuerySchema } from "@/lib/game/customWordSchema";
import { decodeCustomWord } from "@/lib/game/encoding";
import { useGame } from "@/lib/game/useGame";

export const Route = createFileRoute("/game/")({
    component: Game,
    validateSearch: customWordSearchQuerySchema,
});

function Game() {
    const { word: encodedWord } = Route.useSearch();
    const navigate = Route.useNavigate();

    const initialWord = encodedWord ? decodeCustomWord(encodedWord) : null;

    if (encodedWord && !initialWord?.word) {
        navigate({ search: undefined });
    }

    const { word, category, guessedLetters, wrongGuesses, isGameOver, isWin, handleNextWord, handleGuess } = useGame({
        initialWord: initialWord || undefined,
    });

    return (
        <section className="px-2 pt-2 pb-8">
            <BackNav>
                <Button size="sm" onClick={handleNextWord} variant="secondary" disabled={!(isGameOver || isWin)}>
                    Next Word
                </Button>
            </BackNav>
            <div className="flex flex-col gap-8 items-center">
                <Gallows stage={wrongGuesses.length} />
                <div className="flex flex-col items-center gap-4">
                    <p className="text-muted-foreground text-sm">
                        Category: <span className="font-semibold text-foreground capitalize">{category}</span>
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
