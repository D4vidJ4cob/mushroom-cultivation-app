// /test/seeds/places.ts
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { liquidCultures } from '../../src/drizzle/schema';

export const LIQUID_CULTURES_SEED = [
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
];

export async function seedLiquidCultures(drizzle: DatabaseProvider) {
  await drizzle.insert(liquidCultures).values(
    LIQUID_CULTURES_SEED.map((mc) => ({
      ...mc,
      inoculationDate: new Date(mc.inoculationDate),
    })),
  );
}

export async function clearLiquidCultures(drizzle: DatabaseProvider) {
  await drizzle.delete(liquidCultures);
}
