// /test/seeds/places.ts
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { species } from '../../src/drizzle/schema';

export const SPECIES_SEED = [
  {
    id: 1,
    name: 'Lions Mane',
  },
  {
    id: 2,
    name: 'Blue Oyster',
  },
  {
    id: 3,
    name: 'Chestnut',
  },
];

export async function seedSpecies(drizzle: DatabaseProvider) {
  await drizzle.insert(species).values(SPECIES_SEED);
}

export async function clearSpecies(drizzle: DatabaseProvider) {
  await drizzle.delete(species);
}
