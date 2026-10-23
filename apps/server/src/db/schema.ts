import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * Guidance items table defined with Drizzle ORM for PostgreSQL
 */
export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { mode: 'string' })
    .defaultNow()
    .notNull()
});

export type ItemRecord = typeof items.$inferSelect;
export type NewItemRecord = typeof items.$inferInsert;
