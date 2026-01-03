import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { type CurrentGame, currentGame, type GameHistoryInsert, gameHistory } from "@/db/schema";

export const saveGameToHistory = async (game: GameHistoryInsert) => {
    await db.insert(gameHistory).values(game);
};

export const getGameHistory = async () => {
    const history = await db.select().from(gameHistory).orderBy(desc(gameHistory.createdAt));
    return history;
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

export const saveCurrentGame = async (word: string, category: string, guessedLetters: string[]) => {
    await db.insert(currentGame).values({ id: 1, word, category, guessedLetters }).onConflictDoUpdate({
        target: currentGame.id,
        set: { word, category, guessedLetters },
    });
};

export const clearCurrentGame = async () => {
    await db.delete(currentGame);
};
