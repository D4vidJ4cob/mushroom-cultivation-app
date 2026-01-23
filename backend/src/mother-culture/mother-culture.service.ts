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
  CreateMotherCultureRequestDto,
  MotherCultureDetailResponseDto,
  MotherCultureListResponseDto,
  UpdateMotherCultureRequestDto,
} from './mother-culture.dto';
import { motherCultures } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class MotherCultureService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  private validateAndParseDate(
    dateInput: string | Date,
    fieldName = 'date',
  ): string {
    const date =
      typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    if (isNaN(date.getTime())) {
      throw new BadRequestException(
        `Invalid ${fieldName}: must be a valid date format (YYYY-MM-DD or ISO string)`,
      );
    }

    // Return in YYYY-MM-DD formaat for database compatibility
    return date.toISOString().split('T')[0];
  }

  async getAll(): Promise<MotherCultureListResponseDto> {
    const items = await this.db.query.motherCultures.findMany({
      with: {
        species: true,
      },
      orderBy: (motherCultures, { desc }) => [
        desc(motherCultures.inoculationDate),
      ],
    });
    return { items };
  }

  async getById(id: number): Promise<MotherCultureDetailResponseDto> {
    const motherCulture = await this.db.query.motherCultures.findFirst({
      where: eq(motherCultures.id, id),
      with: {
        species: true,
        grainSpawns: {
          orderBy: (grainSpawns, { desc }) => [
            desc(grainSpawns.inoculationDate),
          ],
        },
      },
    });

    if (!motherCulture) {
      throw new NotFoundException(`Mother Culture with ID ${id} not found.`);
    }

    return motherCulture;
  }

  async create(
    createDto: CreateMotherCultureRequestDto,
  ): Promise<MotherCultureDetailResponseDto> {
    const inoculationDate = this.validateAndParseDate(
      createDto.inoculationDate,
      'inoculation date',
    );

    const [newMotherCulture] = await this.db
      .insert(motherCultures)
      .values({
        ...createDto,
        inoculationDate,
      })
      .returning({ id: motherCultures.id });

    return this.getById(newMotherCulture.id);
  }

  async updateById(
    id: number,
    updateDto: UpdateMotherCultureRequestDto,
  ): Promise<MotherCultureDetailResponseDto> {
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
      .update(motherCultures)
      .set(updateFields)
      .where(eq(motherCultures.id, id))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`Mother Culture with ID ${id} not found.`);
    }

    return this.getById(id);
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.db
      .delete(motherCultures)
      .where(eq(motherCultures.id, id))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`Mother Culture with ID ${id} not found.`);
    }
  }
}
