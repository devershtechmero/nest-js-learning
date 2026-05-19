import {
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const cards = pgTable('cards', {
  id: uuid('id').defaultRandom().primaryKey(),

  title: text('title').notNull(),

  description: text('description'),

  image: text('image'),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
});