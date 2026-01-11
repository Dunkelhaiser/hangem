import { boolean, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

const difficultyEnum = pgEnum("difficulty", ["normal", "easy", "hard"]);

export const gameHistory = pgTable("game_history", {
    id: serial("id").primaryKey(),
    word: text("word").notNull(),
    category: text("category").notNull(),
    guessedLetters: text("guessed_letters").array().notNull(),
    won: boolean("won").notNull(),
    difficulty: difficultyEnum().notNull().default("normal"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const currentGame = pgTable("current_game", {
    id: serial("id").primaryKey(),
    word: text("word").notNull(),
    category: text("category").notNull(),
    guessedLetters: text("guessed_letters").array().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdateFn(() => new Date()),
});

export type GameHistoryInsert = Omit<typeof gameHistory.$inferInsert, "id" | "createdAt">;
export type GameHistory = typeof gameHistory.$inferSelect;
export type CurrentGame = typeof currentGame.$inferSelect;
