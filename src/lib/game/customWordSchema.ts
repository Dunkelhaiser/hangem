import { z as zod } from "zod";
import { isValidChar } from "../languages/validators";

export const customWordSearchQuerySchema = zod.object({
    word: zod.string().optional().catch(undefined),
});

const validateWordChars = (word: string, language: "en" | "uk", ctx: zod.RefinementCtx) => {
    const allCharsValid = word.split("").every((char) => isValidChar(char, language, true));

    if (!allCharsValid) {
        ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            path: ["word"],
            message:
                language === "en"
                    ? "Word must contain only English letters"
                    : "Word must contain only Ukrainian letters",
        });
    }
};

export const customWordSchema = zod
    .object({
        word: zod.string().trim().min(2, "Word must be at least 2 characters long"),
        category: zod.string().trim(),
        language: zod.enum(["en", "uk"]),
    })
    .superRefine((data, ctx) => validateWordChars(data.word, data.language, ctx));

export const customWordPayloadSchema = zod
    .object({
        word: zod.string().min(2, "Word must be at least 2 characters long"),
        category: zod.string().optional(),
        language: zod.enum(["en", "uk"]),
    })
    .superRefine((data, ctx) => validateWordChars(data.word, data.language, ctx));

export type CustomWordPayload = zod.infer<typeof customWordPayloadSchema>;
