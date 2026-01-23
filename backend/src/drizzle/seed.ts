import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as argon2 from 'argon2';
import { Role } from '../auth/roles';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5, // Same as connectionLimit
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

  await db
    .insert(schema.species)
    .values([
      { name: 'Lions Mane' },
      { name: 'Blue Oyster' },
      { name: 'Chestnut' },
    ]);
  console.log('Seeding species successfull');
}

async function seedUsers() {
  console.log('👥 Seeding users...');

  await db.insert(schema.users).values([
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
  ]);

  console.log('✅ Users seeded successfully\n');
}

async function seedMotherCultures() {
  console.log('🧫 Seeding mother cultures...');

  await db.insert(schema.motherCultures).values([
    {
      speciesId: 1,
      name: 'Lions Mane',
      inoculationDate: '2025-01-15',
      characteristic: '',
    },
    {
      speciesId: 2,
      name: 'Blue Oyster',
      inoculationDate: '2025-01-10',
      characteristic: '',
    },
    {
      speciesId: 3,
      name: 'Chestnut',
      inoculationDate: '2025-01-12',
      characteristic: 'Slow but steady, resistant to contamination',
    },
  ]);

  console.log('✅ Mother cultures seeded successfully\n');
}

async function seedLiquidCultures() {
  console.log('🧪 Seeding liquid cultures...');

  await db.insert(schema.liquidCultures).values([
    {
      name: 'Lions Mane',
      speciesId: 1,
      inoculationDate: '2025-01-20',
      contaminationStatus: false,
      characteristic: '',
    },
    {
      name: 'Chestnut',
      speciesId: 2,
      inoculationDate: '2025-01-18',
      contaminationStatus: false,
      characteristic: '',
    },
    {
      name: 'Blue Oyster',
      speciesId: 1,
      inoculationDate: '2025-01-22',
      contaminationStatus: null,
      characteristic: '',
    },
  ]);

  console.log('✅ Liquid cultures seeded successfully\n');
}

async function seedGrainSpawns() {
  console.log('🌾 Seeding grain spawns...');

  await db.insert(schema.grainSpawns).values([
    {
      inoculationDate: '2025-01-25',
      contaminationStatus: false,
      shaken: true,
      speciesId: 1,
      motherCultureId: 1,
      liquidCultureId: null,
      characteristic: 'This grain has been soaked',
    },
    {
      inoculationDate: '2025-01-26',
      contaminationStatus: false,
      shaken: false,
      speciesId: 1,
      motherCultureId: null,
      liquidCultureId: 1,
    },
    {
      inoculationDate: '2025-01-27',
      contaminationStatus: null,
      shaken: true,
      speciesId: 2,
      motherCultureId: null,
      liquidCultureId: 2,
      characteristic: 'This grain has been soaked and boiled',
    },
  ]);

  console.log('✅ Grain spawns seeded successfully\n');
}

async function seedSubstrates() {
  console.log('🍄 Seeding substrates...');

  await db.insert(schema.substrates).values([
    {
      grainSpawnId: 1,
      inoculationDate: '2025-02-01',
      incubationDate: '2025-02-15',
      contaminationStatus: false,
    },
    {
      grainSpawnId: 1,
      inoculationDate: '2025-02-01',
      incubationDate: '2025-02-15',
      contaminationStatus: false,
    },
    {
      grainSpawnId: 2,
      inoculationDate: '2025-02-03',
      incubationDate: '2025-02-17',
      contaminationStatus: null,
    },
    {
      grainSpawnId: 3,
      inoculationDate: '2025-02-05',
      incubationDate: '2025-02-19',
      contaminationStatus: true,
    },
  ]);

  console.log('✅ Substrates seeded successfully\n');
}

async function seedBatchAssignments() {
  console.log('📋 Seeding batch assignments...');

  await db.insert(schema.batchAssignments).values([
    { userId: 1, substrateId: 1, role: 'manager' },
    { userId: 1, substrateId: 2, role: 'worker' },
    { userId: 2, substrateId: 2, role: 'manager' },
    { userId: 3, substrateId: 3, role: 'manager' },
    { userId: 3, substrateId: 4, role: 'manager' },
  ]);

  console.log('✅ Batch assignments seeded successfully\n');
}

async function main() {
  console.log('starting db seeding');
  await resetDatabase();
  await seedSpecies();
  await seedUsers();
  await seedMotherCultures();
  await seedLiquidCultures();
  await seedGrainSpawns();
  await seedSubstrates();
  await seedBatchAssignments();
  console.log('seeding completed');
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
