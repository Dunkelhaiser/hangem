CREATE TABLE "game_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"word" text NOT NULL,
	"category" text NOT NULL,
	"guessed_letters" text[] NOT NULL,
	"won" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
