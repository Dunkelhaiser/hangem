interface CustomWordPayload {
    word: string;
    category?: string;
}

export function encodeCustomWord(payload: CustomWordPayload) {
    const json = JSON.stringify({
        word: payload.word,
        category: payload.category || undefined,
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
        const parsed = JSON.parse(decoded) as Partial<CustomWordPayload>;
        // biome-ignore lint/performance/useTopLevelRegex: doesn't run frequently
        const hasLatinChars = parsed.word && /[a-z]/i.test(parsed.word);
        if (hasLatinChars && parsed.word) {
            return {
                word: parsed.word,
                category: parsed.category,
            };
        }
        return null;
    } catch {
        return null;
    }
}
