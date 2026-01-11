import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { GameHistory } from "@/db/schema";

interface Props {
    game: GameHistory;
}

export const HistoryCard = ({ game }: Props) => {
    const correctLetters = game.guessedLetters.filter((letter) => game.word.toLowerCase().includes(letter));
    const wrongLetters = game.guessedLetters.filter((letter) => !game.word.toLowerCase().includes(letter));

    return (
        <Card size="sm">
            <CardHeader className="flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-xl font-semibold uppercase tracking-widest font-mono">
                        {game.word}
                    </CardTitle>
                    {game.won ? (
                        <span className="text-success">
                            <Check className="size-5" />
                        </span>
                    ) : (
                        <span className="text-destructive">
                            <X className="size-5" />
                        </span>
                    )}
                </div>
                <span className="text-xs text-muted-foreground">
                    {new Date(game.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </span>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <div className="flex gap-4 text-sm text-muted-foreground">
                    <p>
                        Category: <span className="text-foreground capitalize font-semibold">{game.category}</span>
                    </p>
                    <p>
                        Difficulty: <span className="text-foreground capitalize font-semibold">{game.difficulty}</span>
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                    <span className="text-muted-foreground">Guesses:</span>
                    {correctLetters.map((letter) => (
                        <span key={letter} className="text-success uppercase font-mono">
                            {letter}
                        </span>
                    ))}
                    {wrongLetters.map((letter) => (
                        <span key={letter} className="text-destructive uppercase font-mono">
                            {letter}
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
