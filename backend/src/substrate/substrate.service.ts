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
  ): Date {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      throw new BadRequestException(`Invalid ${fieldName}`);
    }
    return date;
  }

  async getAll(): Promise<SubstrateListResponseDto> {
    const items = await this.db.query.substrates.findMany({
      // columns: {
      //   grainSpawnId: false,
      // },
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
      : null;

    const [newSubstrate] = await this.db
      .insert(substrates)
      .values({
        ...createDto,
        inoculationDate,
        incubationDate,
      })
      .$returningId();

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
      updateFields.incubationDate = this.validateAndParseDate(
        incubationDate,
        'incubation date',
      );
    }

    const result = await this.db
      .update(substrates)
      .set(updateFields)
      .where(eq(substrates.id, id));

    if (result[0].affectedRows === 0) {
      throw new NotFoundException(`Substrate with ID ${id} not found.`);
    }

    return this.getById(id);
  }

  async deleteById(id: number): Promise<void> {
    const [result] = await this.db
      .delete(substrates)
      .where(eq(substrates.id, id));

    if (result.affectedRows === 0) {
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
    });
    return { items: assignments };
  }
}
