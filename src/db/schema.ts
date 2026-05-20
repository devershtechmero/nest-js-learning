import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const timestamps = {
  updatedAt: timestamp('updated_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow()
}

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  ...timestamps
});

export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  user: uuid('user').references(() => users.id,{ onDelete: 'cascade' }),
  ...timestamps
});