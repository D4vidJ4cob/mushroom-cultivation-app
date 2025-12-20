import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';
import * as argon2 from 'argon2';
import { Role } from '../auth/roles';

const connection = mysql.createPool({
  uri: process.env.DATABASE_url,
  connectionLimit: 5,
});

const db = drizzle({ client: connection, schema, mode: 'default' });

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

  await db.insert(schema.species).values([
    { id: 1, name: 'Lions Mane' },
    { id: 2, name: 'Blue Oyster' },
    { id: 3, name: 'Chestnut' },
  ]);
  console.log('Seeding species successfull');
}

async function seedUsers() {
  console.log('👥 Seeding users...');

  await db.insert(schema.users).values([
    {
      id: 1,
      name: 'David Jacob',
      email: 'davidjacob.bjj@gmail.com',
      passwordHash: await hashPassword('12345678'),
      roles: [Role.ADMIN, Role.USER],
    },
    {
      id: 2,
      name: 'Dries Hoste',
      email: 'drieshoste032@gmail.com',
      passwordHash: await hashPassword('12345678'),
      roles: [Role.ADMIN],
    },
    {
      id: 3,
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
      id: 1,
      speciesId: 1,
      name: 'Lions Mane',
      inoculationDate: new Date('2025-01-15'),
      characteristic: '',
    },
    {
      id: 2,
      speciesId: 2,
      name: 'Blue Oyster',
      inoculationDate: new Date('2025-01-10'),
      characteristic: '',
    },
    {
      id: 3,
      speciesId: 3,
      name: 'Chestnut',
      inoculationDate: new Date('2025-01-12'),
      characteristic: 'Slow but steady, resistant to contamination',
    },
  ]);

  console.log('✅ Mother cultures seeded successfully\n');
}

async function seedLiquidCultures() {
  console.log('🧪 Seeding liquid cultures...');

  await db.insert(schema.liquidCultures).values([
    {
      id: 1,
      name: 'Lions Mane',
      speciesId: 1,
      inoculationDate: new Date('2025-01-20'),
      contaminationStatus: false,
      characteristic: '',
    },
    {
      id: 2,
      name: 'Chestnut',
      speciesId: 2,
      inoculationDate: new Date('2025-01-18'),
      contaminationStatus: false,
      characteristic: '',
    },
    {
      id: 3,
      name: 'Blue Oyster',
      speciesId: 1,
      inoculationDate: new Date('2025-01-22'),
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
      id: 1,
      inoculationDate: new Date('2025-01-25'),
      contaminationStatus: false,
      shaken: true,
      speciesId: 1,
      motherCultureId: 1,
      liquidCultureId: null,
      characteristic: 'This grain has been soaked',
    },
    {
      id: 2,
      inoculationDate: new Date('2025-01-26'),
      contaminationStatus: false,
      shaken: false,
      speciesId: 1,
      motherCultureId: null,
      liquidCultureId: 1,
    },
    {
      id: 3,
      inoculationDate: new Date('2025-01-27'),
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
      id: 1,
      grainSpawnId: 1,
      inoculationDate: new Date('2025-02-01'),
      incubationDate: new Date('2025-02-15'),
      contaminationStatus: false,
    },
    {
      id: 2,
      grainSpawnId: 1,
      inoculationDate: new Date('2025-02-01'),
      incubationDate: new Date('2025-02-15'),
      contaminationStatus: false,
    },
    {
      id: 3,
      grainSpawnId: 2,
      inoculationDate: new Date('2025-02-03'),
      incubationDate: new Date('2025-02-17'),
      contaminationStatus: null,
    },
    {
      id: 4,
      grainSpawnId: 3,
      inoculationDate: new Date('2025-02-05'),
      incubationDate: new Date('2025-02-19'),
      contaminationStatus: true,
    },
  ]);

  console.log('✅ Substrates seeded successfully\n');
}

async function seedBatchAssignments() {
  console.log('📋 Seeding batch assignments...');

  await db.insert(schema.batchAssignments).values([
    { id: 1, userId: 1, substrateId: 1, role: 'manager' },
    { id: 2, userId: 1, substrateId: 2, role: 'worker' },
    { id: 3, userId: 2, substrateId: 2, role: 'manager' },
    { id: 4, userId: 3, substrateId: 3, role: 'manager' },
    { id: 5, userId: 3, substrateId: 4, role: 'manager' },
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
    await connection.end();
  })
  .catch(async (e) => {
    console.error(e);
    await connection.end();
    process.exit(1);
  });
