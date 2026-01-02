import { z as zod } from "zod";

export const customWordSearchQuerySchema = zod.object({
    word: zod.string().optional().catch(undefined),
});

export const customWordSchema = zod.object({
    word: zod.string().trim().min(2, "Word must be at least 2 characters long"),
    category: zod.string().trim(),
});

export const customWordPayloadSchema = zod.object({
    word: zod
        .string()
        .regex(/[a-z]/i, "Word must contain at least one Latin letter")
        .min(2, "Word must be at least 2 characters long"),
    category: zod.string().optional(),
});

export type CustomWordPayload = zod.infer<typeof customWordPayloadSchema>;

export const isLatinChar = (char: string) =>
    zod
        .string()
        // biome-ignore lint/performance/useTopLevelRegex: doesn't run frequently
        .regex(/^[a-z]$/i)
        .safeParse(char).success;
