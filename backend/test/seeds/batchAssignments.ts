// /test/seeds/batchAssignments.ts
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { batchAssignments } from '../../src/drizzle/schema';

export const BATCH_ASSIGNMENTS_SEED = [
  { id: 1, userId: 1, substrateId: 1, role: 'manager' as const },
  { id: 2, userId: 1, substrateId: 2, role: 'worker' as const },
  { id: 3, userId: 2, substrateId: 2, role: 'manager' as const },
  { id: 4, userId: 3, substrateId: 3, role: 'manager' as const },
  { id: 5, userId: 3, substrateId: 4, role: 'manager' as const },
];

export async function seedBatchAssignments(drizzle: DatabaseProvider) {
  await drizzle.insert(batchAssignments).values(BATCH_ASSIGNMENTS_SEED);
}

export async function clearBatchAssignments(drizzle: DatabaseProvider) {
  await drizzle.delete(batchAssignments);
}
