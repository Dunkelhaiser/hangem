import { desc } from "drizzle-orm";
import { db } from "@/db/client";
import { type GameHistoryInsert, gameHistory } from "@/db/schema";

export const saveGameToHistory = async (game: GameHistoryInsert) => {
    await db.insert(gameHistory).values(game);
};

export const getGameHistory = async () => {
    const history = await db.select().from(gameHistory).orderBy(desc(gameHistory.createdAt));
    return history;
};
