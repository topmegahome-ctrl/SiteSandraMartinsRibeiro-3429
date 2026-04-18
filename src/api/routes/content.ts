import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { siteContent } from "../database/schema";
import { eq } from "drizzle-orm";

export const contentRoutes = new Hono<{ Bindings: CloudflareBindings }>();

// GET /api/content — returns all saved edits as { id: value }
contentRoutes.get("/", async (c) => {
  const db = drizzle(c.env.DB);
  const rows = await db.select().from(siteContent).all();
  const result: Record<string, { type: string; value: string }> = {};
  for (const row of rows) {
    result[row.id] = { type: row.type, value: row.value };
  }
  return c.json(result);
});

// POST /api/content — upsert a single field
contentRoutes.post("/", async (c) => {
  const { id, type, value } = await c.req.json<{ id: string; type: string; value: string }>();
  if (!id || !type || value === undefined) {
    return c.json({ error: "Missing fields" }, 400);
  }
  const db = drizzle(c.env.DB);
  await db
    .insert(siteContent)
    .values({ id, type, value })
    .onConflictDoUpdate({ target: siteContent.id, set: { value, type } });
  return c.json({ ok: true });
});

// DELETE /api/content — reset all
contentRoutes.delete("/", async (c) => {
  const db = drizzle(c.env.DB);
  await db.delete(siteContent).all();
  return c.json({ ok: true });
});
