CREATE TYPE "difficulty" AS ENUM ('normal', 'easy');
ALTER TABLE "game_history" ADD COLUMN "difficulty" "difficulty" DEFAULT 'normal' NOT NULL;