import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Field } from "@/components/hangman/Field/Field";
import { Gallows } from "@/components/hangman/Gallows";
import { Keyboard } from "@/components/hangman/Keyboard/Keyboard";
import { Button } from "@/components/ui/Button";
import { customWordSearchQuerySchema } from "@/lib/game/customWordSchema";
import { useGame } from "@/lib/game/useGame";

export const Route = createFileRoute("/game/")({
    component: Game,
    validateSearch: customWordSearchQuerySchema,
});

function Game() {
    const { word: encodedWord } = Route.useSearch();
    const navigate = Route.useNavigate();

    let customWord: string | undefined;
    let customCategory: string | undefined;
    try {
        if (encodedWord) {
            const binary = atob(encodedWord);
            const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
            const decoded = new TextDecoder().decode(bytes);
            const parsed = JSON.parse(decoded) as { word?: string; category?: string };
            // biome-ignore lint/performance/useTopLevelRegex: doesn't run frequently
            const hasLatinChars = parsed.word && /[a-z]/i.test(parsed.word);
            if (hasLatinChars) {
                customWord = parsed.word;
                customCategory = parsed.category;
            }
        }
    } catch {
        customWord = undefined;
        customCategory = undefined;
    }

    if (encodedWord && !customWord) {
        navigate({ search: undefined });
    }

    const initialWord = customWord ? { word: customWord, category: customCategory ?? "Custom" } : undefined;
    const { word, category, guessedLetters, wrongGuesses, isGameOver, isWin, handleNextWord, handleGuess } = useGame({
        initialWord,
    });

    return (
        <section className="px-2 pt-2 pb-8">
            <div className="flex items-center mb-6 justify-between max-w-3xl mx-auto">
                <Button variant="link" size="sm" nativeButton={false} render={<Link to="/" />}>
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
