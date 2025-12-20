// /test/seeds/places.ts
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { motherCultures } from '../../src/drizzle/schema';

export const MOTHER_CULTURES_SEED = [
  {
    id: 1,
    speciesId: 1,
    name: 'Lions Mane',
    inoculationDate: '2025-01-15T00:00:00.000Z',
    characteristic: '',
  },
  {
    id: 2,
    speciesId: 2,
    name: 'Blue Oyster',
    inoculationDate: '2025-01-10T00:00:00.000Z',
    characteristic: '',
  },
  {
    id: 3,
    speciesId: 3,
    name: 'Chestnut',
    inoculationDate: '2025-01-12T00:00:00.000Z',
    characteristic: 'Slow but steady, resistant to contamination',
  },
];

export async function seedMotherCultures(drizzle: DatabaseProvider) {
  await drizzle.insert(motherCultures).values(
    MOTHER_CULTURES_SEED.map((mc) => ({
      ...mc,
      inoculationDate: new Date(mc.inoculationDate),
    })),
  );
}

export async function clearMotherCultures(drizzle: DatabaseProvider) {
  await drizzle.delete(motherCultures);
}
