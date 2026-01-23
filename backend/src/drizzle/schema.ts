import { relations } from 'drizzle-orm';
import {
  pgTable, // ✅ CHANGED: mysqlTable → pgTable
  serial, // ✅ CHANGED: int().autoincrement() → serial()
  integer, // ✅ CHANGED: int() for foreign keys → integer()
  varchar, // ✅ SAME: varchar stays the same
  uniqueIndex, // ✅ SAME: uniqueIndex stays the same
  date, // ✅ SAME: date stays the same
  boolean, // ✅ SAME: boolean stays the same
  pgEnum, // ✅ CHANGED: mysqlEnum → pgEnum
  json, // ✅ SAME: json stays the same
} from 'drizzle-orm/pg-core'; // ✅ CHANGED: mysql-core → pg-core

// ✅ CHANGED: PostgreSQL enums must be defined BEFORE tables
// MySQL enums are inline, PostgreSQL requires separate definition
export const roleEnum = pgEnum('role', ['manager', 'worker']);

// ✅ CHANGED: mysqlTable → pgTable
export const users = pgTable(
  'users',
  {
    // ✅ CHANGED: int().autoincrement() → serial()
    // serial() = auto-incrementing integer in PostgreSQL
    id: serial('id').primaryKey(),

    // ✅ SAME: varchar, length, notNull all work the same
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),

    // ✅ SAME: json works the same in PostgreSQL
    roles: json('roles').notNull(),
  },
  (table) => [uniqueIndex('idx_user_email_unique').on(table.email)],
);

export const species = pgTable(
  'species',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
  },
  (table) => [uniqueIndex('idx_species_name_unique').on(table.name)],
);

export const motherCultures = pgTable('mother_cultures', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  inoculationDate: date('inoculation_date').notNull(),
  characteristic: varchar('characteristic', { length: 255 }),

  // ✅ CHANGED: int() → integer() for foreign keys
  // In PostgreSQL: serial = primary key, integer = foreign key/regular int
  speciesId: integer('species_id')
    .notNull()
    .references(() => species.id, { onDelete: 'restrict' }),
});

export const liquidCultures = pgTable('liquid_cultures', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  inoculationDate: date('inoculation_date').notNull(),
  characteristic: varchar('characteristic', { length: 255 }),

  // ✅ SAME: boolean works the same
  contaminationStatus: boolean('contamination_status'),

  speciesId: integer('species_id')
    .notNull()
    .references(() => species.id, { onDelete: 'restrict' }),
});

export const grainSpawns = pgTable('grain_spawns', {
  id: serial('id').primaryKey(),
  inoculationDate: date('inoculation_date').notNull(),
  characteristic: varchar('characteristic', { length: 255 }),
  contaminationStatus: boolean('contamination_status'),
  shaken: boolean('shaken'),

  speciesId: integer('species_id')
    .notNull()
    .references(() => species.id, { onDelete: 'restrict' }),

  // ✅ CHANGED: int() → integer() for nullable foreign keys
  motherCultureId: integer('mother_culture_id').references(
    () => motherCultures.id,
    { onDelete: 'restrict' },
  ),

  liquidCultureId: integer('liquid_culture_id').references(
    () => liquidCultures.id,
    { onDelete: 'restrict' },
  ),
});

export const substrates = pgTable('substrates', {
  id: serial('id').primaryKey(),
  inoculationDate: date('inoculation_date').notNull(),
  incubationDate: date('incubation_date'),
  contaminationStatus: boolean('contamination_status'),

  grainSpawnId: integer('grain_spawn_id')
    .notNull()
    .references(() => grainSpawns.id, { onDelete: 'restrict' }),
});

export const batchAssignments = pgTable('batch_assignments', {
  id: serial('id').primaryKey(),

  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  substrateId: integer('substrate_id')
    .notNull()
    .references(() => substrates.id, { onDelete: 'cascade' }),

  // ✅ CHANGED: mysqlEnum() → roleEnum (defined above)
  // PostgreSQL enums must be defined separately, then used
  role: roleEnum('role').default('worker').notNull(),
});

// ✅ SAME: All relations stay exactly the same!
// Relations are ORM-level, not database-level, so no changes needed

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
      fields: [batchAssignments.userId],
      references: [users.id],
    }),
    substrate: one(substrates, {
      fields: [batchAssignments.substrateId],
      references: [substrates.id],
    }),
  }),
);
