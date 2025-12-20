// /test/seeds/places.ts
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { grainSpawns } from '../../src/drizzle/schema';

export const GRAIN_SPAWNS_SEED = [
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
];

export async function seedGrainSpawns(drizzle: DatabaseProvider) {
  await drizzle.insert(grainSpawns).values(
    GRAIN_SPAWNS_SEED.map((mc) => ({
      ...mc,
      inoculationDate: new Date(mc.inoculationDate),
    })),
  );
}

export async function clearGrainSpawns(drizzle: DatabaseProvider) {
  await drizzle.delete(grainSpawns);
}
