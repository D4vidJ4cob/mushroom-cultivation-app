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
  CreateSubstrateRequestDto,
  SubstrateAssignmentListResponseDto,
  SubstrateDetailResponseDto,
  SubstrateListResponseDto,
  SubstrateResponseDto,
  UpdateSubstrateRequestDto,
} from './substrate.dto';
import { batchAssignments, substrates } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class SubstrateService {
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

  async getAll(): Promise<SubstrateListResponseDto> {
    const items = await this.db.query.substrates.findMany({
      with: {
        grainSpawn: {
          columns: {
            id: true,
          },
          with: {
            species: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: (substrates, { desc }) => [desc(substrates.inoculationDate)],
    });

    return { items };
  }

  async getById(id: number): Promise<SubstrateDetailResponseDto> {
    const substrate = await this.db.query.substrates.findFirst({
      where: eq(substrates.id, id),
      with: {
        grainSpawn: {
          with: {
            species: true,
          },
        },
      },
    });

    if (!substrate) {
      throw new NotFoundException(`Substrate with ID ${id} not found.`);
    }

    return substrate;
  }

  async create(
    createDto: CreateSubstrateRequestDto,
  ): Promise<SubstrateResponseDto> {
    const inoculationDate = this.validateAndParseDate(
      createDto.inoculationDate,
      'inoculation date',
    );

    const incubationDate = createDto.incubationDate
      ? this.validateAndParseDate(createDto.incubationDate, 'incubation date')
      : undefined;

    const [newSubstrate] = await this.db
      .insert(substrates)
      .values({
        ...createDto,
        inoculationDate,
        ...(incubationDate && { incubationDate }),
      })
      .returning({ id: substrates.id });

    return this.getById(newSubstrate.id);
  }

  async updateById(
    id: number,
    updateDto: UpdateSubstrateRequestDto,
  ): Promise<SubstrateResponseDto> {
    const { incubationDate, inoculationDate, ...restData } = updateDto;

    const updateFields: Record<string, any> = {
      ...restData,
    };

    if (inoculationDate !== undefined) {
      updateFields.inoculationDate = this.validateAndParseDate(
        inoculationDate,
        'inoculation date',
      );
    }

    if (incubationDate !== undefined) {
      if (incubationDate === null) {
        updateFields.incubationDate = null;
      } else {
        updateFields.incubationDate = this.validateAndParseDate(
          incubationDate,
          'incubation date',
        );
      }
    }

    const result = await this.db
      .update(substrates)
      .set(updateFields)
      .where(eq(substrates.id, id))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`Substrate with ID ${id} not found.`);
    }

    return this.getById(id);
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.db
      .delete(substrates)
      .where(eq(substrates.id, id))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`Substrate with ID ${id} not found.`);
    }
  }

  async getAssignedSubstratesByUserId(
    userId: number,
  ): Promise<SubstrateAssignmentListResponseDto> {
    const assignments = await this.db.query.batchAssignments.findMany({
      where: eq(batchAssignments.userId, userId),
      columns: {
        id: true,
        role: true,
      },
      with: {
        substrate: {
          columns: {
            id: true,
            inoculationDate: true,
            contaminationStatus: true,
          },
        },
      },
      orderBy: (batchAssignments, { desc }) => [desc(batchAssignments.id)],
    });

    return { items: assignments };
  }
}
