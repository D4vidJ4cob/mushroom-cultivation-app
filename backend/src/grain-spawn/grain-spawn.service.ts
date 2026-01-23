import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import {
  CreateGrainSpawnRequestDto,
  GrainSpawnDetailResponseDto,
  GrainSpawnsListResponseDto,
  UpdateGrainSpawnRequestDto,
} from './grain-spawn.dto';
import { grainSpawns } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class GrainSpawnService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  private validateAndParseDate(
    dateInput: string | Date,
    fieldName = 'date',
  ): string {
    // Parse if it's a string
    const date =
      typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    if (isNaN(date.getTime())) {
      throw new BadRequestException(
        `Invalid ${fieldName}: must be a valid date format (YYYY-MM-DD or ISO string)`,
      );
    }

    // Return in YYYY-MM-DD format for database compatibility
    return date.toISOString().split('T')[0];
  }

  async getAll(): Promise<GrainSpawnsListResponseDto> {
    const items = await this.db.query.grainSpawns.findMany({
      // TODO: mss werken met columns voor performantie?
      with: {
        species: true,
        liquidCulture: true,
        motherCulture: true,
      },
      orderBy: (grainSpawns, { desc }) => [desc(grainSpawns.inoculationDate)],
    });
    return { items };
  }

  async getById(id: number): Promise<GrainSpawnDetailResponseDto> {
    const grainSpawn = await this.db.query.grainSpawns.findFirst({
      where: eq(grainSpawns.id, id),
      with: {
        species: true,
        liquidCulture: true,
        motherCulture: true,
      },
    });

    if (!grainSpawn) {
      throw new NotFoundException(`Grain Spawn with ID ${id} not found.`);
    }

    return grainSpawn;
  }

  async create(
    createDto: CreateGrainSpawnRequestDto,
  ): Promise<GrainSpawnDetailResponseDto> {
    const inoculationDate = this.validateAndParseDate(
      createDto.inoculationDate,
      'inoculation date',
    );

    const [newGrainSpawn] = await this.db
      .insert(grainSpawns)
      .values({
        ...createDto,
        inoculationDate,
      })
      .returning({ id: grainSpawns.id });

    return this.getById(newGrainSpawn.id);
  }

  async updateById(
    id: number,
    updateDto: UpdateGrainSpawnRequestDto,
  ): Promise<GrainSpawnDetailResponseDto> {
    const { inoculationDate, ...restData } = updateDto;

    const updateFields: Record<string, any> = {
      ...restData,
    };

    if (inoculationDate !== undefined) {
      updateFields.inoculationDate = this.validateAndParseDate(
        inoculationDate,
        'inoculation date',
      );
    }

    const result = await this.db
      .update(grainSpawns)
      .set(updateFields)
      .where(eq(grainSpawns.id, id))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`Grain Spawn with ID ${id} not found.`);
    }

    return this.getById(id);
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.db
      .delete(grainSpawns)
      .where(eq(grainSpawns.id, id))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`Grain Spawn with ID ${id} not found.`);
    }
  }
}
