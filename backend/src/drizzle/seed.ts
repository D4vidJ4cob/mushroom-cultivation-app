import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as argon2 from 'argon2';
import { Role } from '../auth/roles';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
});

const db = drizzle({ client: pool, schema });

async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    hashLength: 32,
    timeCost: 2,
    memoryCost: 2 ** 16,
  });
}

async function resetDatabase() {
  console.log('resetting database');
  await db.delete(schema.batchAssignments);
  await db.delete(schema.substrates);
  await db.delete(schema.grainSpawns);
  await db.delete(schema.liquidCultures);
  await db.delete(schema.motherCultures);
  await db.delete(schema.species);
  await db.delete(schema.users);
  console.log('database reset complete');
}

async function seedSpecies() {
  console.log('Seeding species');

  const seededSpecies = await db
    .insert(schema.species)
    .values([
      { name: 'Lions Mane' },
      { name: 'Blue Oyster' },
      { name: 'Chestnut' },
    ])
    .returning(); // ✅ Return de inserted records met IDs

  console.log('Seeding species successfull');
  return seededSpecies;
}

async function seedUsers() {
  console.log('👥 Seeding users...');

  const seededUsers = await db
    .insert(schema.users)
    .values([
      {
        name: 'David Jacob',
        email: 'davidjacob.bjj@gmail.com',
        passwordHash: await hashPassword('12345678'),
        roles: [Role.ADMIN, Role.USER],
      },
      {
        name: 'Dries Hoste',
        email: 'drieshoste032@gmail.com',
        passwordHash: await hashPassword('12345678'),
        roles: [Role.ADMIN],
      },
      {
        name: 'Ivan Papoov',
        email: 'ivan@example.com',
        passwordHash: await hashPassword('12345678'),
        roles: [Role.USER],
      },
    ])
    .returning();

  console.log('✅ Users seeded successfully\n');
  return seededUsers;
}

async function seedMotherCultures(speciesIds: {
  lionsId: number;
  oystererId: number;
  chestnutId: number;
}) {
  console.log('🧫 Seeding mother cultures...');

  const seededMotherCultures = await db
    .insert(schema.motherCultures)
    .values([
      {
        speciesId: speciesIds.lionsId,
        name: 'Lions Mane MC',
        inoculationDate: '2025-01-15',
        characteristic: '',
      },
      {
        speciesId: speciesIds.oystererId,
        name: 'Blue Oyster MC',
        inoculationDate: '2025-01-10',
        characteristic: '',
      },
      {
        speciesId: speciesIds.chestnutId,
        name: 'Chestnut MC',
        inoculationDate: '2025-01-12',
        characteristic: 'Slow but steady, resistant to contamination',
      },
    ])
    .returning();

  console.log('✅ Mother cultures seeded successfully\n');
  return seededMotherCultures;
}

async function seedLiquidCultures(speciesIds: {
  lionsId: number;
  oystererId: number;
  chestnutId: number;
}) {
  console.log('🧪 Seeding liquid cultures...');

  const seededLiquidCultures = await db
    .insert(schema.liquidCultures)
    .values([
      {
        name: 'Lions Mane LC',
        speciesId: speciesIds.lionsId,
        inoculationDate: '2025-01-20',
        contaminationStatus: false,
        characteristic: '',
      },
      {
        name: 'Chestnut LC',
        speciesId: speciesIds.chestnutId,
        inoculationDate: '2025-01-18',
        contaminationStatus: false,
        characteristic: '',
      },
      {
        name: 'Blue Oyster LC',
        speciesId: speciesIds.oystererId,
        inoculationDate: '2025-01-22',
        contaminationStatus: null,
        characteristic: '',
      },
    ])
    .returning();

  console.log('✅ Liquid cultures seeded successfully\n');
  return seededLiquidCultures;
}

async function seedGrainSpawns(
  speciesIds: { lionsId: number; oystererId: number },
  motherCultureIds: number[],
  liquidCultureIds: number[],
) {
  console.log('🌾 Seeding grain spawns...');

  const seededGrainSpawns = await db
    .insert(schema.grainSpawns)
    .values([
      {
        inoculationDate: '2025-01-25',
        contaminationStatus: false,
        shaken: true,
        speciesId: speciesIds.lionsId,
        motherCultureId: motherCultureIds[0],
        liquidCultureId: null,
        characteristic: 'This grain has been soaked',
      },
      {
        inoculationDate: '2025-01-26',
        contaminationStatus: false,
        shaken: false,
        speciesId: speciesIds.lionsId,
        motherCultureId: null,
        liquidCultureId: liquidCultureIds[0],
      },
      {
        inoculationDate: '2025-01-27',
        contaminationStatus: null,
        shaken: true,
        speciesId: speciesIds.oystererId,
        motherCultureId: null,
        liquidCultureId: liquidCultureIds[1],
        characteristic: 'This grain has been soaked and boiled',
      },
    ])
    .returning();

  console.log('✅ Grain spawns seeded successfully\n');
  return seededGrainSpawns;
}

async function seedSubstrates(grainSpawnIds: number[]) {
  console.log('🍄 Seeding substrates...');

  const seededSubstrates = await db
    .insert(schema.substrates)
    .values([
      {
        grainSpawnId: grainSpawnIds[0],
        inoculationDate: '2025-02-01',
        incubationDate: '2025-02-15',
        contaminationStatus: false,
      },
      {
        grainSpawnId: grainSpawnIds[0],
        inoculationDate: '2025-02-01',
        incubationDate: '2025-02-15',
        contaminationStatus: false,
      },
      {
        grainSpawnId: grainSpawnIds[1],
        inoculationDate: '2025-02-03',
        incubationDate: '2025-02-17',
        contaminationStatus: null,
      },
      {
        grainSpawnId: grainSpawnIds[2],
        inoculationDate: '2025-02-05',
        incubationDate: '2025-02-19',
        contaminationStatus: true,
      },
    ])
    .returning();

  console.log('✅ Substrates seeded successfully\n');
  return seededSubstrates;
}

async function seedBatchAssignments(userIds: number[], substrateIds: number[]) {
  console.log('📋 Seeding batch assignments...');

  await db.insert(schema.batchAssignments).values([
    { userId: userIds[0], substrateId: substrateIds[0], role: 'manager' },
    { userId: userIds[0], substrateId: substrateIds[1], role: 'worker' },
    { userId: userIds[1], substrateId: substrateIds[1], role: 'manager' },
    { userId: userIds[2], substrateId: substrateIds[2], role: 'manager' },
    { userId: userIds[2], substrateId: substrateIds[3], role: 'manager' },
  ]);

  console.log('✅ Batch assignments seeded successfully\n');
}

async function main() {
  console.log('starting db seeding');
  console.log(
    '🔗 Connecting to:',
    process.env.DATABASE_URL?.substring(0, 30) + '...',
  ); // Check connection string

  // Test connection
  const testQuery = await db.execute('SELECT NOW()');
  console.log('✅ Database connected at:', testQuery.rows[0]);

  await resetDatabase();
  console.log('starting db seeding');
  await resetDatabase();

  // Seed in order and capture IDs
  const species = await seedSpecies();
  const users = await seedUsers();

  const speciesIds = {
    lionsId: species[0].id,
    oystererId: species[1].id,
    chestnutId: species[2].id,
  };

  const motherCultures = await seedMotherCultures(speciesIds);
  const liquidCultures = await seedLiquidCultures(speciesIds);
  const grainSpawns = await seedGrainSpawns(
    speciesIds,
    motherCultures.map((mc) => mc.id),
    liquidCultures.map((lc) => lc.id),
  );
  const substrates = await seedSubstrates(grainSpawns.map((gs) => gs.id));
  await seedBatchAssignments(
    users.map((u) => u.id),
    substrates.map((s) => s.id),
  );

  console.log('seeding completed ✅');
}

main()
  .then(async () => {
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await pool.end();
    process.exit(1);
  });
