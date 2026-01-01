import { z as zod } from "zod";

export const customWordsearchQuerySchema = zod
    .object({
        word: zod.string().trim().min(2).optional(),
        category: zod.string().trim().min(1).optional().catch(undefined),
    })
    .transform((data) => ({
        word: data.word,
        category: data.word ? data.category : undefined,
    }))
    .catch({
        word: undefined,
        category: undefined,
    });

export const customWordSchema = zod.object({
    word: zod.string().trim().min(2, "Word must be at least 2 characters long"),
    category: zod.string().trim(),
});
