import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { drizzle } from 'drizzle-orm/d1';
import { eq, asc } from 'drizzle-orm';
import * as schema from './db/schema';

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('/*', cors());

app.get('/', (c) => {
    return c.text('BISMA Backend API with Drizzle ORM is running!');
});

// --- AUTH ---

app.post('/login', async (c) => {
    const { username, password } = await c.req.json();
    const db = drizzle(c.env.DB, { schema });
    
    try {
        const admin = await db.query.admins.findFirst({
            where: (admins, { and, eq }) => and(eq(admins.username, username), eq(admins.password, password)),
        });

        if (admin) {
            return c.json({ success: true, token: 'authenticated_token_' + Date.now() });
        } else {
            return c.json({ success: false, error: 'Username atau password salah' }, 401);
        }
    } catch (e) {
        // Fallback if table doesn't exist yet or other error
        if (username === 'admin' && password === 'bisma2025') {
            return c.json({ success: true, token: 'fallback_token' });
        }
        return c.json({ error: 'Login failed' }, 500);
    }
});

// --- RULES ---

app.get('/rules', async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const results = await db.select().from(schema.rules).all();
        // Parse JSON examples
        const parsedRules = results.map((r) => ({
            ...r,
            examples: r.examples ? JSON.parse(r.examples) : []
        }));
        return c.json(parsedRules);
    } catch (e) {
        console.error(e);
        return c.json([], 200); 
    }
});

app.post('/rules', async (c) => {
    const rulesData = await c.req.json();
    const db = drizzle(c.env.DB, { schema });

    if (!Array.isArray(rulesData)) {
        return c.json({ error: 'Expected array of rules' }, 400);
    }

    try {
        // Unfortunately D1 batch in Drizzle is a bit different, 
        // we can use the underlying D1 batch or sequence them.
        // For simplicity and safety, we'll try to use a transaction-like approach if possible, 
        // but D1 doesn't support real transactions well outside of batch.
        
        await db.delete(schema.rules).run();
        
        if (rulesData.length > 0) {
            await db.insert(schema.rules).values(rulesData.map(r => ({
                id: r.id,
                title: r.title,
                iconName: r.iconName,
                description: r.description,
                explanation: r.explanation,
                examples: JSON.stringify(r.examples)
            }))).run();
        }

        return c.json({ success: true });
    } catch (e) {
        console.error(e);
        return c.json({ error: 'Failed to save rules' }, 500);
    }
});

// --- CONTENT SETTINGS ---

app.get('/content', async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const result = await db.query.contentSettings.findFirst({
            where: eq(schema.contentSettings.id, 'default'),
        });
        if (result) {
            return c.json(JSON.parse(result.data));
        }
        return c.json(null);
    } catch (e) {
        return c.json(null);
    }
});

app.post('/content', async (c) => {
    const content = await c.req.json();
    const db = drizzle(c.env.DB, { schema });
    try {
        await db.insert(schema.contentSettings)
            .values({ id: 'default', data: JSON.stringify(content) })
            .onConflictDoUpdate({
                target: schema.contentSettings.id,
                set: { data: JSON.stringify(content) }
            })
            .run();
        return c.json({ success: true });
    } catch (e) {
        console.error(e);
        return c.json({ error: 'Failed to save content settings' }, 500);
    }
});

// --- MATERI ---

app.get('/materi', async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const results = await db.select().from(schema.materi).orderBy(asc(schema.materi.urutan)).all();
        return c.json(results);
    } catch (e) {
        console.error(e);
        return c.json({ error: 'Failed to fetch materi' }, 500);
    }
});

// --- SOAL / LATIHAN ---

app.get('/soal', async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const results = await db.select().from(schema.soal).all();
        return c.json(results);
    } catch (e) {
        console.error(e);
        return c.json({ error: 'Failed to fetch soal' }, 500);
    }
});

app.get('/soal/:materiId', async (c) => {
    const materiId = parseInt(c.req.param('materiId'));
    const db = drizzle(c.env.DB, { schema });
    try {
        const results = await db.select().from(schema.soal).where(eq(schema.soal.materiId, materiId)).all();
        return c.json(results);
    } catch (e) {
        console.error(e);
        return c.json({ error: 'Failed to fetch soal for materi' }, 500);
    }
});

export default app;
