// /test/seeds/places.ts
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { substrates } from '../../src/drizzle/schema';

export const SUBSTRATES_SEED = [
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
];

export async function seedSubstrates(drizzle: DatabaseProvider) {
  await drizzle.insert(substrates).values(
    SUBSTRATES_SEED.map((mc) => ({
      ...mc,
      inoculationDate: new Date(mc.inoculationDate),
    })),
  );
}

export async function clearSubstrates(drizzle: DatabaseProvider) {
  await drizzle.delete(substrates);
}
