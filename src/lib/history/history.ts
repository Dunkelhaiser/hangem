import { and, asc, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/client";
import { type CurrentGame, currentGame, type GameHistoryInsert, gameHistory } from "@/db/schema";
import type { Language } from "../languages/alphabets";

export const sortBySchema = z.enum(["date", "word"]).default("date").catch("date");
export const orderSchema = z.enum(["asc", "desc"]).default("desc").catch("desc");
export const groupSchema = z.enum(["all", "won", "lost"]).default("all").catch("all");

export const historySortSchema = z.object({
    sortBy: sortBySchema,
    order: orderSchema,
    group: groupSchema,
});

export type SortBy = z.infer<typeof sortBySchema>;
export type Order = z.infer<typeof orderSchema>;
export type Group = z.infer<typeof groupSchema>;
export type HistorySort = z.infer<typeof historySortSchema>;

export const saveGameToHistory = async (game: GameHistoryInsert) => {
    await db.insert(gameHistory).values(game);
};

export const getGameHistory = async (page: number, size: number, { sortBy, order, group }: HistorySort) => {
    const column = sortBy === "date" ? gameHistory.createdAt : gameHistory.word;
    const orderFn = order === "asc" ? asc : desc;

    const history = await db
        .select()
        .from(gameHistory)
        // biome-ignore lint/style/noNestedTernary: readable enough
        .where(group === "won" ? eq(gameHistory.won, true) : group === "lost" ? eq(gameHistory.won, false) : undefined)
        .orderBy(orderFn(column))
        .limit(size)
        .offset(page * size);

    return {
        data: history,
        nextPage: history.length === size ? page + 1 : undefined,
    };
};

export const getPlayedCombinations = async () => {
    const history = await db.select({ word: gameHistory.word, category: gameHistory.category }).from(gameHistory);
    return new Set(history.map((h) => `${h.word.toLowerCase()}:${h.category.toLowerCase()}`));
};

export const findExistingGame = async (word: string, category = "Custom") => {
    const [existing] = await db
        .select()
        .from(gameHistory)
        .where(and(eq(gameHistory.word, word), eq(gameHistory.category, category)))
        .limit(1);
    return existing ?? null;
};

export const getCurrentGame = async (): Promise<CurrentGame | null> => {
    const [game] = await db.select().from(currentGame).limit(1);
    return game ?? null;
};

export const saveCurrentGame = async (word: string, category: string, language: Language, guessedLetters: string[]) => {
    await db.insert(currentGame).values({ id: 1, word, category, guessedLetters, language }).onConflictDoUpdate({
        target: currentGame.id,
        set: { word, category, guessedLetters, language },
    });
};

export const clearCurrentGame = async () => {
    await db.delete(currentGame);
};

export const exportGameHistory = async () => {
    const history = await db.select().from(gameHistory).orderBy(desc(gameHistory.createdAt));

    const jsonContent = JSON.stringify(history, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `hangem-history-${new Date().toISOString().split("T")[0]}.json`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

const importHistorySchema = z.object({
    word: z.string(),
    category: z.string(),
    guessedLetters: z.array(z.string()),
    won: z.boolean(),
    difficulty: z.enum(["normal", "easy", "hard"]),
    language: z.enum(["en", "uk"]),
    createdAt: z.coerce.date(),
});

const importSchema = z.array(importHistorySchema);

export const importGameHistory = async (jsonString: string) => {
    const parsed = importSchema.parse(JSON.parse(jsonString));

    await db.delete(gameHistory);

    if (parsed.length > 0) {
        await db.insert(gameHistory).values(parsed);
    }

    return { imported: parsed.length };
};

export const clearGameHistory = async () => {
    await db.delete(gameHistory);
    await db.delete(currentGame);
};
