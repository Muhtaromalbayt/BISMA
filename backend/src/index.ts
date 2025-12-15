import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('/*', cors());

app.get('/', (c) => {
    return c.text('BISMA Backend API is running!');
});

// --- AUTH ---

app.post('/login', async (c) => {
    const { username, password } = await c.req.json();
    try {
        const admin: any = await c.env.DB.prepare('SELECT * FROM admins WHERE username = ? AND password = ?').bind(username, password).first();
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
    try {
        const { results } = await c.env.DB.prepare('SELECT * FROM rules').all();
        // Parse JSON examples
        const parsedRules = results.map((r: any) => ({
            ...r,
            examples: JSON.parse(r.examples)
        }));
        return c.json(parsedRules);
    } catch (e) {
        console.error(e);
        return c.json([], 200); // Return empty array on error (e.g. table not found)
    }
});

app.post('/rules', async (c) => {
    const rules = await c.req.json(); // Expecting array of rules

    if (!Array.isArray(rules)) {
        return c.json({ error: 'Expected array of rules' }, 400);
    }

    try {
        // Transaction to replace all rules
        const batch = [
            c.env.DB.prepare('DELETE FROM rules'),
            ...rules.map((r: any) =>
                c.env.DB.prepare('INSERT INTO rules (id, title, iconName, description, explanation, examples) VALUES (?, ?, ?, ?, ?, ?)')
                    .bind(r.id, r.title, r.iconName, r.description, r.explanation, JSON.stringify(r.examples))
            )
        ];

        await c.env.DB.batch(batch);
        return c.json({ success: true });
    } catch (e) {
        console.error(e);
        return c.json({ error: 'Failed to save rules' }, 500);
    }
});

// --- CONTENT SETTINGS ---

app.get('/content', async (c) => {
    try {
        const result: any = await c.env.DB.prepare("SELECT data FROM content_settings WHERE id = 'default'").first();
        if (result) {
            return c.json(JSON.parse(result.data));
        }
        return c.json(null); // No settings saved yet
    } catch (e) {
        return c.json(null);
    }
});

app.post('/content', async (c) => {
    const content = await c.req.json();
    try {
        await c.env.DB.prepare("INSERT OR REPLACE INTO content_settings (id, data) VALUES ('default', ?)").bind(JSON.stringify(content)).run();
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: 'Failed to save content settings' }, 500);
    }
});

export default app;
