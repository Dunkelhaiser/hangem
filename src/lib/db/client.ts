import { PGlite } from "@electric-sql/pglite";
import { PgDialect } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/pglite";
import migrations from "./migrations/export.json" with { type: "json" };

const client = new PGlite("idb://hangem-db");
export const db = drizzle(client);

export async function initDb() {
    try {
        // biome-ignore lint/suspicious/noExplicitAny: build script
        await new PgDialect().migrate(migrations, db._.session as any, "rechron-pgdata");
    } catch {
        // biome-ignore lint/suspicious/noConsole:build script
        console.log("Migrations failed");
    }
}
