import { relations } from 'drizzle-orm';
import {
  mysqlTable,
  int,
  varchar,
  uniqueIndex,
  date,
  boolean,
  mysqlEnum,
  json,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable(
  'users',
  {
    id: int('id', { unsigned: true }).primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    roles: json('roles').notNull(),
  },
  (table) => [uniqueIndex('idx_user_email_unique').on(table.email)],
);

export const species = mysqlTable(
  'species',
  {
    id: int('id', { unsigned: true }).primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
  },
  (table) => [uniqueIndex('idx_species_name_unique').on(table.name)],
);

export const motherCultures = mysqlTable('mother_cultures', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  inoculationDate: date('inoculation_date').notNull(),
  characteristic: varchar('characteristic', { length: 255 }),
  speciesId: int('species_id', { unsigned: true })
    .notNull()
    .references(() => species.id, { onDelete: 'restrict' }),
  // qr-code implementeren
});

export const liquidCultures = mysqlTable('liquid_cultures', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  inoculationDate: date('inoculation_date').notNull(),
  characteristic: varchar('characteristic', { length: 255 }),
  contaminationStatus: boolean('contamination_status'),
  speciesId: int('species_id', { unsigned: true })
    .notNull()
    .references(() => species.id, { onDelete: 'restrict' }),
  // qr-code implementeren
});

export const grainSpawns = mysqlTable('grain_spawns', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  inoculationDate: date('inoculation_date').notNull(),
  characteristic: varchar('characteristic', { length: 255 }),
  contaminationStatus: boolean('contamination_status'),
  shaken: boolean('shaken'),
  speciesId: int('species_id', { unsigned: true })
    .notNull()
    .references(() => species.id, { onDelete: 'restrict' }),
  motherCultureId: int('mother_culture_id', { unsigned: true }).references(
    () => motherCultures.id,
    { onDelete: 'restrict' },
  ),
  liquidCultureId: int('liquid_culture_id', { unsigned: true }).references(
    () => liquidCultures.id,
    { onDelete: 'restrict' },
  ),
  // qr-code implementeren
});

export const substrates = mysqlTable('substrates', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  inoculationDate: date('inoculation_date').notNull(),
  incubationDate: date('incubation_date'),
  contaminationStatus: boolean('contamination_status'),
  grainSpawnId: int('grain_spawn_id', { unsigned: true })
    .notNull()
    .references(() => grainSpawns.id, { onDelete: 'restrict' }),
  // qr-code implementeren
});

export const batchAssignments = mysqlTable('batch_assignments', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  userId: int('user_id', { unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  substrateId: int('substrate_id', { unsigned: true })
    .notNull()
    .references(() => substrates.id, { onDelete: 'cascade' }),
  role: mysqlEnum('role', ['manager', 'worker']).default('worker').notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  batchAssignments: many(batchAssignments),
}));

export const speciesRelations = relations(species, ({ many }) => ({
  motherCultures: many(motherCultures),
  liquidCultures: many(liquidCultures),
  grainSpawns: many(grainSpawns),
}));

export const motherCulturesRelations = relations(
  motherCultures,
  ({ one, many }) => ({
    species: one(species, {
      fields: [motherCultures.speciesId],
      references: [species.id],
    }),
    grainSpawns: many(grainSpawns),
  }),
);

export const liquidCulturesRelations = relations(
  liquidCultures,
  ({ one, many }) => ({
    species: one(species, {
      fields: [liquidCultures.speciesId],
      references: [species.id],
    }),
    grainSpawns: many(grainSpawns),
  }),
);

export const grainSpawnsRelations = relations(grainSpawns, ({ one, many }) => ({
  species: one(species, {
    fields: [grainSpawns.speciesId],
    references: [species.id],
  }),
  motherCulture: one(motherCultures, {
    fields: [grainSpawns.motherCultureId],
    references: [motherCultures.id],
  }),
  liquidCulture: one(liquidCultures, {
    fields: [grainSpawns.liquidCultureId],
    references: [liquidCultures.id],
  }),
  substrates: many(substrates),
}));

export const substratesRelations = relations(substrates, ({ one, many }) => ({
  grainSpawn: one(grainSpawns, {
    fields: [substrates.grainSpawnId],
    references: [grainSpawns.id],
  }),
  assignments: many(batchAssignments),
}));

export const batchAssignmentsRelations = relations(
  batchAssignments,
  ({ one }) => ({
    user: one(users, {
      fields: [batchAssignments.id],
      references: [users.id],
    }),
    substrate: one(substrates, {
      fields: [batchAssignments.substrateId],
      references: [substrates.id],
    }),
  }),
);
