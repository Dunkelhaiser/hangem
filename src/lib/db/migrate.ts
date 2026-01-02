// biome-ignore lint/correctness/noNodejsModules: used in build scripts
import fs from "node:fs/promises";
import { readMigrationFiles } from "drizzle-orm/migrator";

const file = "./src/lib/db/migrations/export.json";

async function main() {
    const content = JSON.stringify(
        readMigrationFiles({
            migrationsFolder: "./src/lib/db/migrations",
        }),
        null,
        0
    );

    const updatedContent = content.replace(/CREATE TABLE/g, "CREATE TABLE IF NOT EXISTS");

    await fs.writeFile(`${file}`, updatedContent, {
        flag: "w",
    });
}

main();
