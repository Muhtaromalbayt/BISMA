import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './drizzle',
    dialect: 'sqlite',
    driver: 'd1-http',
    dbCredentials: {
        databaseId: 'dec6c1b2-886a-463f-be4f-2d2a510bd795',
    },
});
