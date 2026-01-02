import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const gameHistory = pgTable("game_history", {
    id: serial("id").primaryKey(),
    word: text("word").notNull(),
    category: text("category").notNull(),
    guessedLetters: text("guessed_letters").array().notNull(),
    won: boolean("won").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type GameHistoryInsert = Omit<typeof gameHistory.$inferInsert, "id" | "createdAt">;
export type GameHistory = typeof gameHistory.$inferSelect;
