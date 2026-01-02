import { db } from "@/db/client";
import { type GameHistoryInsert, gameHistory } from "@/db/schema";

export const saveGameToHistory = async (game: GameHistoryInsert) => {
    await db.insert(gameHistory).values(game);
};
