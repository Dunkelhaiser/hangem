import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getLocalStorage = <T>(key: string) => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? (JSON.parse(stored) as T) : undefined;
    } catch {
        return undefined;
    }
};

export const saveLocalStorage = <T>(key: string, value: Partial<T>) => {
    const current = getLocalStorage<Partial<T>>(key);
    localStorage.setItem(key, JSON.stringify({ ...current, ...value }));
};
