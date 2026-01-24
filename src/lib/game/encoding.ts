import { type CustomWordPayload, customWordPayloadSchema } from "./customWordSchema";

export function encodeCustomWord(payload: CustomWordPayload) {
    const json = JSON.stringify({
        word: payload.word,
        category: payload.category || undefined,
        language: payload.language,
    });
    const uint8Array = new TextEncoder().encode(json);
    let binary = "";
    for (const byte of uint8Array) binary += String.fromCharCode(byte);
    return btoa(binary);
}

export function decodeCustomWord(encoded: string) {
    try {
        const binary = atob(encoded);
        const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
        const decoded = new TextDecoder().decode(bytes);
        const parsed = JSON.parse(decoded) as unknown;
        const result = customWordPayloadSchema.safeParse(parsed);
        if (result.success) return result.data;
        return null;
    } catch {
        return null;
    }
}
