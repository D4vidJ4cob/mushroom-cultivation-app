import type { ExceptionFilter } from '@nestjs/common';
import { Catch, ConflictException, NotFoundException } from '@nestjs/common';
import { DrizzleQueryError } from 'drizzle-orm';

@Catch(DrizzleQueryError)
export class DrizzleQueryErrorFilter implements ExceptionFilter {
  catch(error: DrizzleQueryError) {
    if (!error.cause || !('code' in error.cause)) {
      throw new Error(error.message || 'Unknown database error');
    }

    const {
      cause: { code, message },
    } = error;

    switch (code) {
      // MySQL 'ER_DUP_ENTRY' → PostgreSQL '23505' (unique violation)
      case '23505':
        if (message.includes('idx_species_name_unique')) {
          throw new ConflictException(
            'A species with this name already exists',
          );
        } else if (message.includes('idx_mother_culture_name_unique')) {
          throw new ConflictException(
            'A mother culture with this name already exists',
          );
        } else if (message.includes('idx_liquid_culture_name_unique')) {
          throw new ConflictException(
            'A liquid culture with this name already exists',
          );
        } else if (message.includes('idx_grain_spawn_name_unique')) {
          throw new ConflictException(
            'A grain spawn with this name already exists',
          );
        } else if (message.includes('idx_substrate_name_unique')) {
          throw new ConflictException(
            'A substrate with this name already exists',
          );
        } else if (message.includes('idx_user_email_unique')) {
          throw new ConflictException(
            'There is already a user with this email address',
          );
        } else {
          throw new ConflictException('This item already exists');
        }

      // MySQL 'ER_NO_REFERENCED_ROW_2' → PostgreSQL '23503' (foreign key violation)
      case '23503':
        if (message.includes('species_id')) {
          throw new NotFoundException('No species with this id exists');
        } else if (message.includes('mother_culture_id')) {
          throw new NotFoundException('No mother culture with this id exists');
        } else if (message.includes('liquid_culture_id')) {
          throw new NotFoundException('No liquid culture with this id exists');
        } else if (message.includes('grain_spawn_id')) {
          throw new NotFoundException('No grain spawn with this id exists');
        } else if (message.includes('user_id')) {
          throw new NotFoundException('No user with this id exists');
        } else if (message.includes('substrate_id')) {
          throw new NotFoundException('No substrate with this id exists');
        }

        // Also handle DELETE with foreign key constraint
        // When trying to delete a record that is referenced by other records
        if (
          message.toLowerCase().includes('delete') ||
          message.includes('still referenced')
        ) {
          if (message.includes('species')) {
            throw new ConflictException(
              'Cannot delete species: it is still being used by cultures',
            );
          } else if (message.includes('mother_culture')) {
            throw new ConflictException(
              'Cannot delete mother culture: it is still being used by grain spawns',
            );
          } else if (message.includes('liquid_culture')) {
            throw new ConflictException(
              'Cannot delete liquid culture: it is still being used by grain spawns',
            );
          } else if (message.includes('grain_spawn')) {
            throw new ConflictException(
              'Cannot delete grain spawn: it is still being used by substrates',
            );
          } else if (message.includes('substrate')) {
            throw new ConflictException(
              'Cannot delete substrate: it still has assignments',
            );
          } else if (message.includes('user')) {
            throw new ConflictException(
              'Cannot delete user: they still have assignments',
            );
          } else {
            throw new ConflictException(
              'Cannot delete: this item is still being referenced',
            );
          }
        }
        break;
    }

    throw error;
  }
}
