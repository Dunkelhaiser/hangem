import { z as zod } from "zod";

export const customWordSearchQuerySchema = zod.object({
    word: zod.string().optional().catch(undefined),
});

export const customWordSchema = zod.object({
    word: zod.string().trim().min(2, "Word must be at least 2 characters long"),
    category: zod.string().trim(),
});
