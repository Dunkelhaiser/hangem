import { useState } from "react";
import { type Difficulty, getDifficulty, setDifficulty } from "@/lib/difficulty";
import { clearCurrentGame } from "@/lib/history/history";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/Select";

const difficultyOptions = [
    { value: "normal", label: "Normal" },
    { value: "easy", label: "Easy" },
] satisfies { value: Difficulty; label: string }[];

const DifficultySelect = () => {
    const [difficulty, setDifficultyState] = useState<Difficulty>(getDifficulty);

    const handleDifficultyChange = async (value: Difficulty | null) => {
        if (!value) return;
        setDifficultyState(value);
        setDifficulty(value);
        await clearCurrentGame();
    };

    return (
        <Select value={difficulty} onValueChange={handleDifficultyChange} items={difficultyOptions}>
            <SelectTrigger className="w-28">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {difficultyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export { DifficultySelect };
