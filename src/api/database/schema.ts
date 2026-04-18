import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const siteContent = sqliteTable("site_content", {
  id: text("id").primaryKey(),       // e.g. "hero-tagline"
  type: text("type").notNull(),       // "text" | "image"
  value: text("value").notNull(),
});
