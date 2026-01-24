ALTER TABLE "current_game" ADD COLUMN "language" "language" DEFAULT 'en' NOT NULL;--> statement-breakpoint
ALTER TABLE "game_history" ADD COLUMN "language" "language" DEFAULT 'en' NOT NULL;